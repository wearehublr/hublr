import type { SupabaseClient } from "@supabase/supabase-js";

const TIMEOUT_MS = 15000;

// Blunt keyword filter to cut obvious noise (senior/experienced-hire
// postings on the same board) before creating a review draft. Not a
// substitute for human review -- expect occasional false positives and
// false negatives, tune the list after seeing real output.
const EARLY_CAREER_KEYWORDS = [
  "intern",
  "internship",
  "graduate",
  "campus",
  "placement",
  "trainee",
  "apprentice",
  "summer analyst",
  "off-cycle",
  "off cycle",
  "insight",
  "spring week",
  "vacation scheme",
  "entry level",
  "entry-level",
  "new grad",
  "early career",
  "early-career",
];

function looksEarlyCareer(title: string): boolean {
  const lower = title.toLowerCase();
  return EARLY_CAREER_KEYWORDS.some((kw) => lower.includes(kw));
}

function stripHtml(html: string | null | undefined): string | null {
  if (!html) return null;
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
  return text || null;
}

async function fetchWithTimeout(
  url: string,
  init?: RequestInit,
): Promise<Response | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

type Board =
  | { source: "greenhouse"; company: string; token: string }
  | { source: "lever"; company: string; company_slug: string }
  | { source: "workday"; company: string; hostname: string; tenant: string; site: string };

type Candidate = {
  role_title: string;
  apply_url: string;
  full_description: string | null;
};

// Derive one board per distinct company already using a recognized ATS,
// by reusing the same URL-shape logic as check-dead-links.ts's adapters.
// No separate config to maintain: the list of companies to poll grows
// automatically as more Greenhouse/Lever/Workday roles get added manually.
function discoverBoards(rows: { company: string; apply_url: string }[]): Board[] {
  const boards = new Map<string, Board>();

  for (const row of rows) {
    let url: URL;
    try {
      url = new URL(row.apply_url);
    } catch {
      continue;
    }
    const host = url.hostname.toLowerCase();
    const segments = url.pathname.split("/").filter(Boolean);

    if (host === "boards.greenhouse.io" || host === "job-boards.greenhouse.io") {
      const jobsIndex = segments.indexOf("jobs");
      const token = jobsIndex >= 1 ? segments[jobsIndex - 1] : null;
      if (token) {
        boards.set(`greenhouse:${token}`, { source: "greenhouse", company: row.company, token });
      }
    } else if (host === "jobs.lever.co") {
      const companySlug = segments[0];
      if (companySlug) {
        boards.set(`lever:${companySlug}`, {
          source: "lever",
          company: row.company,
          company_slug: companySlug,
        });
      }
    } else if (host.endsWith(".myworkdayjobs.com")) {
      const jobIndex = segments.indexOf("job");
      const site = jobIndex >= 1 ? segments[jobIndex - 1] : null;
      const tenant = url.hostname.split(".")[0];
      if (site && tenant) {
        boards.set(`workday:${host}:${site}`, {
          source: "workday",
          company: row.company,
          hostname: host,
          tenant,
          site,
        });
      }
    }
  }

  return Array.from(boards.values());
}

async function listGreenhouseJobs(board: Extract<Board, { source: "greenhouse" }>): Promise<Candidate[]> {
  const res = await fetchWithTimeout(
    `https://boards-api.greenhouse.io/v1/boards/${board.token}/jobs?content=true`,
  );
  if (!res || !res.ok) return [];
  try {
    const data = await res.json();
    const jobs = Array.isArray(data?.jobs) ? data.jobs : [];
    return jobs
      .filter((j: { title?: string }) => looksEarlyCareer(j.title ?? ""))
      .map((j: { title: string; absolute_url: string; content?: string }) => ({
        role_title: j.title,
        apply_url: j.absolute_url,
        full_description: stripHtml(j.content),
      }));
  } catch {
    return [];
  }
}

async function listLeverJobs(board: Extract<Board, { source: "lever" }>): Promise<Candidate[]> {
  const res = await fetchWithTimeout(
    `https://api.lever.co/v0/postings/${board.company_slug}?mode=json`,
  );
  if (!res || !res.ok) return [];
  try {
    const jobs = await res.json();
    if (!Array.isArray(jobs)) return [];
    return jobs
      .filter((j: { text?: string }) => looksEarlyCareer(j.text ?? ""))
      .map((j: { text: string; hostedUrl: string; descriptionPlain?: string }) => ({
        role_title: j.text,
        apply_url: j.hostedUrl,
        full_description: j.descriptionPlain ?? null,
      }));
  } catch {
    return [];
  }
}

async function listWorkdayJobs(board: Extract<Board, { source: "workday" }>): Promise<Candidate[]> {
  const candidates: Candidate[] = [];
  const limit = 20;
  let offset = 0;

  for (let page = 0; page < 10; page += 1) {
    const res = await fetchWithTimeout(
      `https://${board.hostname}/wday/cxs/${board.tenant}/${board.site}/jobs`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ appliedFacets: {}, limit, offset, searchText: "" }),
      },
    );
    if (!res || !res.ok) break;

    try {
      const data = await res.json();
      const postings = Array.isArray(data?.jobPostings) ? data.jobPostings : [];
      for (const p of postings as { title?: string; externalPath?: string }[]) {
        if (!p.title || !p.externalPath || !looksEarlyCareer(p.title)) continue;
        candidates.push({
          role_title: p.title,
          apply_url: `https://${board.hostname}${p.externalPath}`,
          // Workday's list endpoint doesn't include full descriptions;
          // those only come from the single-job CXS endpoint, which would
          // mean one extra request per candidate. Left null here and
          // filled in by hand during review, same as any other field.
          full_description: null,
        });
      }
      if (postings.length < limit) break;
    } catch {
      break;
    }
    offset += limit;
  }

  return candidates;
}

// Sibling to closeDeadOpportunityLinks: instead of checking existing rows'
// links, this lists ALL current postings on boards already represented in
// the table and inserts unpublished drafts for ones not yet tracked. Drafts
// are invisible to the public site (is_published: false is enforced by
// both the public query functions in opportunities.ts and RLS) until a
// human reviews and publishes them from /admin.
export async function discoverNewOpportunities(
  supabase: SupabaseClient,
): Promise<{ found: number; inserted: number }> {
  const { data: existing, error } = await supabase
    .from("opportunities")
    .select("company, apply_url, logo_url");

  if (error || !existing) return { found: 0, inserted: 0 };

  const existingUrls = new Set(existing.map((r) => r.apply_url));
  const logoByCompany = new Map<string, string>();
  for (const row of existing) {
    if (row.logo_url && !logoByCompany.has(row.company)) {
      logoByCompany.set(row.company, row.logo_url);
    }
  }

  const boards = discoverBoards(existing);
  const currentYear = new Date().getFullYear();

  let found = 0;
  let inserted = 0;

  for (const board of boards) {
    try {
      const candidates =
        board.source === "greenhouse"
          ? await listGreenhouseJobs(board)
          : board.source === "lever"
            ? await listLeverJobs(board)
            : await listWorkdayJobs(board);

      const newCandidates = candidates.filter((c) => !existingUrls.has(c.apply_url));
      found += newCandidates.length;

      for (const candidate of newCandidates) {
        const { error: insertError } = await supabase.from("opportunities").insert({
          company: board.company,
          role_title: candidate.role_title,
          category: "other",
          region: "uk",
          cycle_year: currentYear,
          apply_url: candidate.apply_url,
          source_url: candidate.apply_url,
          logo_url: logoByCompany.get(board.company) ?? null,
          full_description: candidate.full_description,
          notes:
            "Auto-discovered draft: category, cycle_year, and region are placeholders and need review before publishing.",
          is_published: false,
          discovered_via: "auto",
        });
        if (!insertError) {
          inserted += 1;
          existingUrls.add(candidate.apply_url);
        }
      }
    } catch {
      // One bad board shouldn't abort the run.
    }
  }

  return { found, inserted };
}
