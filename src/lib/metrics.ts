import type { SupabaseClient } from "@supabase/supabase-js";

export type OpportunityMetric = {
  opportunity_id: string;
  company: string;
  role_title: string;
  clicks: number;
  applied: number;
};

export type FunnelStage = {
  stage: string;
  label: string;
  uniqueUsers: number;
};

export type SegmentBreakdown = {
  segment: string;
  clickedUsers: number;
  trackedUsers: number;
  appliedUsers: number;
};

export type MetricsSummary = {
  totalClicks: number;
  uniqueClickUsers: number;
  totalTracked: number;
  uniqueTrackedUsers: number;
  totalApplied: number;
  uniqueAppliedUsers: number;
  totalRejected: number;
  totalWithdrawn: number;
  funnel: FunnelStage[];
  byStudentStatus: SegmentBreakdown[];
  bySponsorshipNeed: SegmentBreakdown[];
  byOpportunity: OpportunityMetric[];
};

type ProfileForSegmentation = {
  student_status: string | null;
  requires_sponsorship: boolean | null;
};

// Excludes the admin account (ADMIN_EMAIL) plus any known team/test accounts
// listed in TEST_ACCOUNT_EMAILS (comma-separated). Accounts aren't flagged
// anywhere in the schema itself, so anything not named in these env vars
// still shows up in these numbers.
export async function getExcludedUserIds(
  adminSupabase: SupabaseClient,
): Promise<Set<string>> {
  const excludedEmails = new Set(
    [process.env.ADMIN_EMAIL, ...(process.env.TEST_ACCOUNT_EMAILS ?? "").split(",")]
      .map((e) => e?.trim().toLowerCase())
      .filter((e): e is string => !!e),
  );
  if (excludedEmails.size === 0) return new Set();

  const excludedIds = new Set<string>();
  let page = 1;
  const perPage = 1000;
  while (true) {
    const { data, error } = await adminSupabase.auth.admin.listUsers({
      page,
      perPage,
    });
    if (error || !data) break;
    for (const u of data.users) {
      if (u.email && excludedEmails.has(u.email.toLowerCase())) {
        excludedIds.add(u.id);
      }
    }
    if (data.users.length < perPage) break;
    page += 1;
  }
  return excludedIds;
}

const APPLIED_OR_BEYOND = new Set([
  "applied",
  "oa_assessment",
  "interview",
  "offer",
]);
const INTERVIEW_OR_BEYOND = new Set(["interview", "offer"]);

function bucketCount(
  userIds: Iterable<string>,
  profileMap: Map<string, ProfileForSegmentation>,
  keyFn: (p: ProfileForSegmentation | undefined) => string,
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const id of userIds) {
    const key = keyFn(profileMap.get(id));
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

export async function getMetricsSummary(
  supabase: SupabaseClient,
  adminSupabase: SupabaseClient,
  excludedUserIds: Set<string>,
): Promise<MetricsSummary> {
  const [{ data: clicksRaw }, { data: applicationsRaw }, { data: profilesRaw }] =
    await Promise.all([
      supabase.from("link_clicks").select("opportunity_id, user_id"),
      adminSupabase.from("applications").select("opportunity_id, stage, user_id"),
      adminSupabase.from("profiles").select("id, student_status, requires_sponsorship"),
    ]);

  const clicks = (clicksRaw ?? []).filter(
    (c) => !c.user_id || !excludedUserIds.has(c.user_id),
  );
  const applications = (applicationsRaw ?? []).filter(
    (a) => !excludedUserIds.has(a.user_id),
  );

  const profileMap = new Map<string, ProfileForSegmentation>(
    (profilesRaw ?? []).map((p) => [
      p.id,
      {
        student_status: p.student_status ?? null,
        requires_sponsorship: p.requires_sponsorship ?? null,
      },
    ]),
  );

  const clicksByOpportunity = new Map<string, number>();
  const clickedUserIds = new Set<string>();
  for (const c of clicks) {
    if (c.user_id) clickedUserIds.add(c.user_id);
    if (!c.opportunity_id) continue;
    clicksByOpportunity.set(
      c.opportunity_id,
      (clicksByOpportunity.get(c.opportunity_id) ?? 0) + 1,
    );
  }

  const appliedByOpportunity = new Map<string, number>();
  const trackedUserIds = new Set<string>();
  const appliedUserIds = new Set<string>();
  const interviewUserIds = new Set<string>();
  const offerUserIds = new Set<string>();
  let totalApplied = 0;
  let totalRejected = 0;
  let totalWithdrawn = 0;

  for (const a of applications) {
    trackedUserIds.add(a.user_id);
    if (APPLIED_OR_BEYOND.has(a.stage)) appliedUserIds.add(a.user_id);
    if (INTERVIEW_OR_BEYOND.has(a.stage)) interviewUserIds.add(a.user_id);
    if (a.stage === "offer") offerUserIds.add(a.user_id);
    if (a.stage === "rejected") totalRejected += 1;
    if (a.stage === "withdrawn") totalWithdrawn += 1;

    if (a.stage === "applied") {
      totalApplied += 1;
      if (a.opportunity_id) {
        appliedByOpportunity.set(
          a.opportunity_id,
          (appliedByOpportunity.get(a.opportunity_id) ?? 0) + 1,
        );
      }
    }
  }

  const opportunityIds = new Set([
    ...clicksByOpportunity.keys(),
    ...appliedByOpportunity.keys(),
  ]);

  // Look up only the opportunities that have activity, in chunks: fetching the
  // whole table silently stops at the API row limit, which made real
  // opportunities show up as "(deleted opportunity)".
  const nameByOpportunity = new Map<string, { company: string; role_title: string }>();
  const idList = Array.from(opportunityIds);
  for (let i = 0; i < idList.length; i += 100) {
    const { data } = await adminSupabase
      .from("opportunities")
      .select("id, company, role_title")
      .in("id", idList.slice(i, i + 100));
    for (const o of data ?? []) {
      nameByOpportunity.set(o.id, { company: o.company, role_title: o.role_title });
    }
  }

  const byOpportunity: OpportunityMetric[] = idList
    .map((id) => ({
      opportunity_id: id,
      company: nameByOpportunity.get(id)?.company ?? "(deleted opportunity)",
      role_title: nameByOpportunity.get(id)?.role_title ?? `(id ${id})`,
      clicks: clicksByOpportunity.get(id) ?? 0,
      applied: appliedByOpportunity.get(id) ?? 0,
    }))
    .sort((a, b) => b.clicks - a.clicks);

  const funnel: FunnelStage[] = [
    { stage: "clicked", label: "Clicked apply", uniqueUsers: clickedUserIds.size },
    { stage: "tracked", label: "Tracked ≥ 1 opportunity", uniqueUsers: trackedUserIds.size },
    { stage: "applied", label: "Applied", uniqueUsers: appliedUserIds.size },
    { stage: "interview", label: "Interview", uniqueUsers: interviewUserIds.size },
    { stage: "offer", label: "Offer", uniqueUsers: offerUserIds.size },
  ];

  const studentStatusLabels: { key: string; label: string }[] = [
    { key: "home", label: "Home (UK)" },
    { key: "international", label: "International" },
    { key: "unknown", label: "Not set" },
  ];
  const statusKey = (p: ProfileForSegmentation | undefined) => p?.student_status ?? "unknown";
  const clickedByStatus = bucketCount(clickedUserIds, profileMap, statusKey);
  const trackedByStatus = bucketCount(trackedUserIds, profileMap, statusKey);
  const appliedByStatus = bucketCount(appliedUserIds, profileMap, statusKey);
  const byStudentStatus: SegmentBreakdown[] = studentStatusLabels.map(({ key, label }) => ({
    segment: label,
    clickedUsers: clickedByStatus.get(key) ?? 0,
    trackedUsers: trackedByStatus.get(key) ?? 0,
    appliedUsers: appliedByStatus.get(key) ?? 0,
  }));

  const sponsorshipLabels: { key: string; label: string }[] = [
    { key: "yes", label: "Needs sponsorship" },
    { key: "no", label: "Doesn't need sponsorship" },
    { key: "unknown", label: "Not set" },
  ];
  const sponsorshipKey = (p: ProfileForSegmentation | undefined) => {
    if (p?.requires_sponsorship === true) return "yes";
    if (p?.requires_sponsorship === false) return "no";
    return "unknown";
  };
  const clickedBySponsorship = bucketCount(clickedUserIds, profileMap, sponsorshipKey);
  const trackedBySponsorship = bucketCount(trackedUserIds, profileMap, sponsorshipKey);
  const appliedBySponsorship = bucketCount(appliedUserIds, profileMap, sponsorshipKey);
  const bySponsorshipNeed: SegmentBreakdown[] = sponsorshipLabels.map(({ key, label }) => ({
    segment: label,
    clickedUsers: clickedBySponsorship.get(key) ?? 0,
    trackedUsers: trackedBySponsorship.get(key) ?? 0,
    appliedUsers: appliedBySponsorship.get(key) ?? 0,
  }));

  return {
    totalClicks: clicks.length,
    uniqueClickUsers: clickedUserIds.size,
    totalTracked: applications.length,
    uniqueTrackedUsers: trackedUserIds.size,
    totalApplied,
    uniqueAppliedUsers: appliedUserIds.size,
    totalRejected,
    totalWithdrawn,
    funnel,
    byStudentStatus,
    bySponsorshipNeed,
    byOpportunity,
  };
}

export type SecondWeekReturnStats = {
  eligibleUsers: number;
  returnedUsers: number;
  returnRatePercent: number | null;
};

const DAY_MS = 24 * 60 * 60 * 1000;

type UserWithActions = { id: string; createdAt: number; actionTimestamps: number[] };

// "Meaningful use" is scoped to actions a student had to deliberately take:
// clicking Apply, tracking a new opportunity, saving a search, or saving an
// event. Deliberately excludes applications.updated_at - the deadline
// reminder cron also bumps that column when it marks a reminder as sent, so
// using it here would count a background job as a student "returning".
async function getUsersWithActions(
  adminSupabase: SupabaseClient,
  excludedUserIds: Set<string>,
): Promise<UserWithActions[]> {
  let page = 1;
  const perPage = 1000;
  const users: { id: string; createdAt: number }[] = [];
  while (true) {
    const { data, error } = await adminSupabase.auth.admin.listUsers({ page, perPage });
    if (error || !data) break;
    for (const u of data.users) {
      if (!excludedUserIds.has(u.id)) {
        users.push({ id: u.id, createdAt: new Date(u.created_at).getTime() });
      }
    }
    if (data.users.length < perPage) break;
    page += 1;
  }

  const [{ data: clicks }, { data: apps }, { data: searches }, { data: events }] =
    await Promise.all([
      adminSupabase.from("link_clicks").select("user_id, clicked_at"),
      adminSupabase.from("applications").select("user_id, created_at"),
      adminSupabase.from("saved_searches").select("user_id, created_at"),
      adminSupabase.from("saved_events").select("user_id, created_at"),
    ]);

  const actionsByUser = new Map<string, number[]>();
  const addAction = (userId: string | null, at: string) => {
    if (!userId || excludedUserIds.has(userId)) return;
    if (!actionsByUser.has(userId)) actionsByUser.set(userId, []);
    actionsByUser.get(userId)!.push(new Date(at).getTime());
  };
  for (const c of clicks ?? []) addAction(c.user_id, c.clicked_at);
  for (const a of apps ?? []) addAction(a.user_id, a.created_at);
  for (const s of searches ?? []) addAction(s.user_id, s.created_at);
  for (const e of events ?? []) addAction(e.user_id, e.created_at);

  return users.map((u) => ({ ...u, actionTimestamps: actionsByUser.get(u.id) ?? [] }));
}

function hasReturnedInWindow(user: UserWithActions): boolean {
  const windowStart = user.createdAt + 7 * DAY_MS;
  const windowEnd = user.createdAt + 13 * DAY_MS;
  return user.actionTimestamps.some((t) => t >= windowStart && t <= windowEnd);
}

export async function getSecondWeekReturnRate(
  adminSupabase: SupabaseClient,
  excludedUserIds: Set<string>,
): Promise<SecondWeekReturnStats> {
  const now = Date.now();
  const users = await getUsersWithActions(adminSupabase, excludedUserIds);

  // Only students who have had the full 13-day observation period count -
  // someone who signed up yesterday hasn't had the chance to return yet.
  const eligible = users.filter((u) => now - u.createdAt >= 13 * DAY_MS);
  if (eligible.length === 0) {
    return { eligibleUsers: 0, returnedUsers: 0, returnRatePercent: null };
  }

  const returned = eligible.filter(hasReturnedInWindow).length;

  return {
    eligibleUsers: eligible.length,
    returnedUsers: returned,
    returnRatePercent: Math.round((returned / eligible.length) * 100),
  };
}

export type WeeklyCohort = {
  weekStart: string;
  signups: number;
  eligibleForReturn: number;
  returned: number;
  returnRatePercent: number | null;
};

// Groups sign-ups by the Monday of their sign-up week, so a cohort's return
// rate can be tracked over time rather than as one all-time snapshot.
function mondayOfWeek(timestamp: number): number {
  const d = new Date(timestamp);
  const day = d.getUTCDay();
  const diffToMonday = (day + 6) % 7;
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - diffToMonday);
}

export async function getWeeklyReturnCohorts(
  adminSupabase: SupabaseClient,
  excludedUserIds: Set<string>,
  weeks = 10,
): Promise<WeeklyCohort[]> {
  const now = Date.now();
  const users = await getUsersWithActions(adminSupabase, excludedUserIds);

  const buckets = new Map<number, { signups: number; eligible: number; returned: number }>();
  for (const u of users) {
    const wk = mondayOfWeek(u.createdAt);
    if (!buckets.has(wk)) buckets.set(wk, { signups: 0, eligible: 0, returned: 0 });
    const bucket = buckets.get(wk)!;
    bucket.signups += 1;
    if (now - u.createdAt >= 13 * DAY_MS) {
      bucket.eligible += 1;
      if (hasReturnedInWindow(u)) bucket.returned += 1;
    }
  }

  return Array.from(buckets.keys())
    .sort((a, b) => b - a)
    .slice(0, weeks)
    .sort((a, b) => a - b)
    .map((wk) => {
      const bucket = buckets.get(wk)!;
      return {
        weekStart: new Date(wk).toISOString().slice(0, 10),
        signups: bucket.signups,
        eligibleForReturn: bucket.eligible,
        returned: bucket.returned,
        returnRatePercent:
          bucket.eligible > 0 ? Math.round((bucket.returned / bucket.eligible) * 100) : null,
      };
    });
}

export type StudentStats = {
  totalUsers: number;
  totalProfilesCompleted: number;
  homeCount: number;
  internationalCount: number;
  topIndustries: { industry: string; count: number }[];
  topUniversities: { university: string; count: number }[];
};

// Requires the service-role admin client: profiles RLS only lets a user
// read their own row, and counting registered users needs auth.admin.
export async function getStudentStats(
  adminSupabase: SupabaseClient,
  excludedUserIds: Set<string>,
): Promise<StudentStats> {
  let totalUsers = 0;
  let page = 1;
  const perPage = 1000;
  while (true) {
    const { data, error } = await adminSupabase.auth.admin.listUsers({
      page,
      perPage,
    });
    if (error || !data) break;
    totalUsers += data.users.filter((u) => !excludedUserIds.has(u.id)).length;
    if (data.users.length < perPage) break;
    page += 1;
  }

  const { data: profilesRaw } = await adminSupabase
    .from("profiles")
    .select("id, student_status, interested_industries, university");

  const profiles = (profilesRaw ?? []).filter((p) => !excludedUserIds.has(p.id));

  let homeCount = 0;
  let internationalCount = 0;
  const industryCounts = new Map<string, number>();
  const universityCounts = new Map<string, number>();

  for (const p of profiles) {
    if (p.student_status === "home") homeCount += 1;
    if (p.student_status === "international") internationalCount += 1;
    for (const industry of p.interested_industries ?? []) {
      industryCounts.set(industry, (industryCounts.get(industry) ?? 0) + 1);
    }
    if (p.university) {
      universityCounts.set(
        p.university,
        (universityCounts.get(p.university) ?? 0) + 1,
      );
    }
  }

  const topIndustries = Array.from(industryCounts.entries())
    .map(([industry, count]) => ({ industry, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topUniversities = Array.from(universityCounts.entries())
    .map(([university, count]) => ({ university, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalUsers,
    totalProfilesCompleted: profiles.length,
    homeCount,
    internationalCount,
    topIndustries,
    topUniversities,
  };
}
