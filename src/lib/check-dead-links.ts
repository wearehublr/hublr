import type { SupabaseClient } from "@supabase/supabase-js";

const TIMEOUT_MS = 8000;
const CONCURRENCY = 5;

type CheckResult = "closed" | "open" | "unknown";

async function fetchWithTimeout(
  url: string,
  init?: RequestInit,
): Promise<Response | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal, redirect: "follow" });
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// Greenhouse's path-based board URLs (boards.greenhouse.io/{token}/jobs/{id})
// expose a stable public read API that 404s once a posting is pulled.
// The `?gh_jid=` embedded-widget style (used on some company-branded career
// pages) doesn't carry a derivable board token, so those fall through to
// the generic checker instead.
async function checkGreenhouse(url: URL): Promise<CheckResult> {
  const segments = url.pathname.split("/").filter(Boolean);
  const jobsIndex = segments.indexOf("jobs");
  if (jobsIndex < 1 || !segments[jobsIndex + 1]) return "unknown";
  const token = segments[jobsIndex - 1];
  const id = segments[jobsIndex + 1];
  const res = await fetchWithTimeout(
    `https://boards-api.greenhouse.io/v1/boards/${token}/jobs/${id}`,
  );
  if (!res) return "unknown";
  if (res.status === 404) return "closed";
  if (res.ok) return "open";
  return "unknown";
}

async function checkLever(url: URL): Promise<CheckResult> {
  const segments = url.pathname.split("/").filter(Boolean);
  if (segments.length < 2) return "unknown";
  const [company, postingId] = segments;
  const res = await fetchWithTimeout(
    `https://api.lever.co/v0/postings/${company}/${postingId}`,
  );
  if (!res) return "unknown";
  if (res.status === 404) return "closed";
  if (res.ok) return "open";
  return "unknown";
}

// Workday's CXS job-detail JSON endpoint mirrors the path segments of the
// public posting URL: everything after "/job/" becomes the job path, and
// the segment immediately before "/job/" is the site name, regardless of
// how many locale segments precede it.
async function checkWorkday(url: URL): Promise<CheckResult> {
  const segments = url.pathname.split("/").filter(Boolean);
  const jobIndex = segments.indexOf("job");
  if (jobIndex < 1) return "unknown";
  const site = segments[jobIndex - 1];
  const jobPath = segments.slice(jobIndex + 1).join("/");
  const tenant = url.hostname.split(".")[0];
  if (!site || !jobPath || !tenant) return "unknown";

  const res = await fetchWithTimeout(
    `https://${url.hostname}/wday/cxs/${tenant}/${site}/job/${jobPath}`,
  );
  if (!res) return "unknown";
  if (res.status === 404) return "closed";
  if (!res.ok) return "unknown";

  try {
    const data = await res.json();
    if (data && typeof data === "object" && "jobPostingInfo" in data) return "open";
    return "closed";
  } catch {
    return "unknown";
  }
}

// Everything else: bespoke company career pages, Workable, Symphony
// Talent-powered sites, etc. There's no stable API to query, and most of
// these render client-side, so a 200 response proves nothing either way.
// Only a hard 404/410 is treated as a real signal.
async function checkGeneric(url: URL): Promise<CheckResult> {
  const res = await fetchWithTimeout(url.toString());
  if (!res) return "unknown";
  if (res.status === 404 || res.status === 410) return "closed";
  return "unknown";
}

async function checkOpportunityLink(applyUrl: string): Promise<CheckResult> {
  let url: URL;
  try {
    url = new URL(applyUrl);
  } catch {
    return "unknown";
  }

  const host = url.hostname.toLowerCase();
  if (host === "boards.greenhouse.io" || host === "job-boards.greenhouse.io") {
    return checkGreenhouse(url);
  }
  if (host === "jobs.lever.co") {
    return checkLever(url);
  }
  if (host.endsWith(".myworkdayjobs.com")) {
    return checkWorkday(url);
  }
  return checkGeneric(url);
}

async function runInBatches<T>(
  items: T[],
  size: number,
  worker: (item: T) => Promise<void>,
): Promise<void> {
  for (let i = 0; i < items.length; i += size) {
    await Promise.all(items.slice(i, i + size).map(worker));
  }
}

// Sibling to closeExpiredOpportunities (date-based): this closes
// opportunities whose real source posting has been confirmed pulled, which
// matters most for 'rolling' listings with no deadline to expire against.
// A bounded batch, oldest-checked-first, keeps each run fast and spreads
// outbound requests across days rather than hitting every stored URL daily.
export async function closeDeadOpportunityLinks(
  supabase: SupabaseClient,
  batchSize = 25,
): Promise<{ checked: number; closed: number }> {
  const { data: opportunities, error } = await supabase
    .from("opportunities")
    .select("id, apply_url")
    .in("status", ["open", "rolling"])
    .order("link_checked_at", { ascending: true, nullsFirst: true })
    .limit(batchSize);

  if (error || !opportunities) return { checked: 0, closed: 0 };

  let checked = 0;
  let closed = 0;
  const now = new Date().toISOString();

  await runInBatches(opportunities, CONCURRENCY, async (opportunity) => {
    try {
      const result = await checkOpportunityLink(opportunity.apply_url);
      checked += 1;

      if (result === "closed") {
        await supabase
          .from("opportunities")
          .update({ status: "closed", link_checked_at: now })
          .eq("id", opportunity.id);
        closed += 1;
      } else {
        await supabase
          .from("opportunities")
          .update({ link_checked_at: now })
          .eq("id", opportunity.id);
      }
    } catch {
      // Leave link_checked_at untouched so a transient failure gets
      // retried on the next run instead of silently skipped forever.
    }
  });

  return { checked, closed };
}
