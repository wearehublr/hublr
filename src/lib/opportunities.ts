import type { SupabaseClient } from "@supabase/supabase-js";
import type { Opportunity } from "@/types/opportunity";
import { compareByDate } from "@/lib/sort-by-date";

function sortByDeadline(opportunities: Opportunity[]): Opportunity[] {
  const sorted = [...opportunities].sort((a, b) =>
    a.company.localeCompare(b.company),
  );
  sorted.sort((a, b) => compareByDate(a.deadline, b.deadline));
  return sorted;
}

// PostgREST caps unpaginated selects at db-max-rows (1000 by default), so
// any query that can return more than that must page through with .range().
const MAX_ROWS_PER_PAGE = 1000;

async function fetchAllRows<T>(
  runQuery: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }>,
): Promise<T[]> {
  const all: T[] = [];
  let from = 0;
  for (;;) {
    const { data, error } = await runQuery(from, from + MAX_ROWS_PER_PAGE - 1);
    if (error) throw error;
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < MAX_ROWS_PER_PAGE) break;
    from += MAX_ROWS_PER_PAGE;
  }
  return all;
}

export async function getPublishedOpportunities(
  supabase: SupabaseClient,
): Promise<Opportunity[]> {
  const data = await fetchAllRows<Opportunity>((from, to) =>
    supabase
      .from("opportunities")
      .select("*")
      .eq("is_published", true)
      .range(from, to),
  );
  return sortByDeadline(data);
}

export async function getPublishedOpportunitiesByYear(
  supabase: SupabaseClient,
  cycleYear: number,
): Promise<Opportunity[]> {
  const data = await fetchAllRows<Opportunity>((from, to) =>
    supabase
      .from("opportunities")
      .select("*")
      .eq("is_published", true)
      .eq("cycle_year", cycleYear)
      .range(from, to),
  );
  return sortByDeadline(data);
}

export async function getRecentPublishedOpportunities(
  supabase: SupabaseClient,
  limit: number,
): Promise<Opportunity[]> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Opportunity[];
}

export async function getPublishedOpportunitiesCount(
  supabase: SupabaseClient,
): Promise<number> {
  const { count, error } = await supabase
    .from("opportunities")
    .select("*", { count: "exact", head: true })
    .eq("is_published", true);

  if (error) throw error;
  return count ?? 0;
}

// Visa sponsorship is only tracked for UK-based roles (the UK Skilled
// Worker sponsor licence) - it doesn't mean anything for US/EU roles, so
// this is scoped to region='uk' even though visa_sponsorship is a column
// on every opportunity. See src/lib/visa-sponsorship.ts.
export async function getVisaSponsorshipOpportunities(
  supabase: SupabaseClient,
): Promise<Opportunity[]> {
  return fetchAllRows<Opportunity>((from, to) =>
    supabase
      .from("opportunities")
      .select("*")
      .eq("is_published", true)
      .eq("region", "uk")
      .eq("visa_sponsorship", "yes")
      .order("company", { ascending: true })
      .range(from, to),
  );
}

export async function getVisaSponsorshipOpportunitiesCount(
  supabase: SupabaseClient,
): Promise<number> {
  const { count, error } = await supabase
    .from("opportunities")
    .select("*", { count: "exact", head: true })
    .eq("is_published", true)
    .eq("region", "uk")
    .eq("visa_sponsorship", "yes");

  if (error) throw error;
  return count ?? 0;
}

export async function getOpportunitiesClosingWithinDaysCount(
  supabase: SupabaseClient,
  days: number,
): Promise<number> {
  const now = new Date();
  const windowEnd = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  const { count, error } = await supabase
    .from("opportunities")
    .select("*", { count: "exact", head: true })
    .eq("is_published", true)
    .neq("status", "closed")
    .gte("deadline", now.toISOString())
    .lte("deadline", windowEnd.toISOString());

  if (error) throw error;
  return count ?? 0;
}

export async function getPublishedOpportunityById(
  supabase: SupabaseClient,
  id: string,
): Promise<Opportunity | null> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle();

  if (error) throw error;
  return data as Opportunity | null;
}

export async function getAllOpportunities(
  supabase: SupabaseClient,
): Promise<Opportunity[]> {
  const data = await fetchAllRows<Opportunity>((from, to) =>
    supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to),
  );
  return data;
}
