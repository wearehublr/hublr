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

export async function getPublishedOpportunities(
  supabase: SupabaseClient,
): Promise<Opportunity[]> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("is_published", true);

  if (error) throw error;
  return sortByDeadline(data as Opportunity[]);
}

export async function getPublishedOpportunitiesByYear(
  supabase: SupabaseClient,
  cycleYear: number,
): Promise<Opportunity[]> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("is_published", true)
    .eq("cycle_year", cycleYear);

  if (error) throw error;
  return sortByDeadline(data as Opportunity[]);
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

export async function getVisaSponsorshipOpportunities(
  supabase: SupabaseClient,
): Promise<Opportunity[]> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("is_published", true)
    .eq("visa_sponsorship", "yes")
    .order("company", { ascending: true });

  if (error) throw error;
  return data as Opportunity[];
}

export async function getVisaSponsorshipOpportunitiesCount(
  supabase: SupabaseClient,
): Promise<number> {
  const { count, error } = await supabase
    .from("opportunities")
    .select("*", { count: "exact", head: true })
    .eq("is_published", true)
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
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Opportunity[];
}
