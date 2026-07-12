import type { SupabaseClient } from "@supabase/supabase-js";
import type { Opportunity } from "@/types/opportunity";

export async function getPublishedOpportunities(
  supabase: SupabaseClient,
): Promise<Opportunity[]> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("is_published", true)
    .order("deadline", { ascending: true, nullsFirst: false })
    .order("company", { ascending: true });

  if (error) throw error;
  return data as Opportunity[];
}

export async function getPublishedOpportunitiesByYear(
  supabase: SupabaseClient,
  cycleYear: number,
): Promise<Opportunity[]> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("is_published", true)
    .eq("cycle_year", cycleYear)
    .order("deadline", { ascending: true, nullsFirst: false })
    .order("company", { ascending: true });

  if (error) throw error;
  return data as Opportunity[];
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
