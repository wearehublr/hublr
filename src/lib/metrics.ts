import type { SupabaseClient } from "@supabase/supabase-js";

export type OpportunityMetric = {
  opportunity_id: string;
  company: string;
  role_title: string;
  clicks: number;
  applied: number;
};

export type MetricsSummary = {
  totalClicks: number;
  totalTracked: number;
  totalApplied: number;
  byOpportunity: OpportunityMetric[];
};

export async function getMetricsSummary(
  supabase: SupabaseClient,
): Promise<MetricsSummary> {
  const [{ data: clicks }, { data: applications }, { data: opportunities }] =
    await Promise.all([
      supabase.from("link_clicks").select("opportunity_id"),
      supabase.from("applications").select("opportunity_id, stage"),
      supabase.from("opportunities").select("id, company, role_title"),
    ]);

  const nameByOpportunity = new Map(
    (opportunities ?? []).map((o) => [o.id, { company: o.company, role_title: o.role_title }]),
  );

  const clicksByOpportunity = new Map<string, number>();
  for (const c of clicks ?? []) {
    if (!c.opportunity_id) continue;
    clicksByOpportunity.set(
      c.opportunity_id,
      (clicksByOpportunity.get(c.opportunity_id) ?? 0) + 1,
    );
  }

  const appliedByOpportunity = new Map<string, number>();
  let totalApplied = 0;
  for (const a of applications ?? []) {
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

  return {
    totalClicks: clicks?.length ?? 0,
    totalTracked: applications?.length ?? 0,
    totalApplied,
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
    totalUsers += data.users.length;
    if (data.users.length < perPage) break;
    page += 1;
  }

  const { data: profiles } = await adminSupabase
    .from("profiles")
    .select("student_status, interested_industries, university");

  let homeCount = 0;
  let internationalCount = 0;
  const industryCounts = new Map<string, number>();
  const universityCounts = new Map<string, number>();

  for (const p of profiles ?? []) {
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
    totalProfilesCompleted: profiles?.length ?? 0,
    homeCount,
    internationalCount,
    topIndustries,
    topUniversities,
  };
}
