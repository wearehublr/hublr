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

// The only account we can positively identify as non-genuine is the admin's
// own login. Other manual test accounts aren't flagged anywhere in the
// schema, so they still show up in these numbers unless named explicitly.
export async function getExcludedUserIds(
  adminSupabase: SupabaseClient,
): Promise<Set<string>> {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return new Set();

  let page = 1;
  const perPage = 1000;
  while (true) {
    const { data, error } = await adminSupabase.auth.admin.listUsers({
      page,
      perPage,
    });
    if (error || !data) break;
    const match = data.users.find((u) => u.email === adminEmail);
    if (match) return new Set([match.id]);
    if (data.users.length < perPage) break;
    page += 1;
  }
  return new Set();
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
  const [{ data: clicksRaw }, { data: applicationsRaw }, { data: opportunities }, { data: profilesRaw }] =
    await Promise.all([
      supabase.from("link_clicks").select("opportunity_id, user_id"),
      supabase.from("applications").select("opportunity_id, stage, user_id"),
      supabase.from("opportunities").select("id, company, role_title"),
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

  const nameByOpportunity = new Map(
    (opportunities ?? []).map((o) => [o.id, { company: o.company, role_title: o.role_title }]),
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

  const byOpportunity: OpportunityMetric[] = Array.from(opportunityIds)
    .map((id) => ({
      opportunity_id: id,
      company: nameByOpportunity.get(id)?.company ?? "(deleted opportunity)",
      role_title: nameByOpportunity.get(id)?.role_title ?? "",
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
