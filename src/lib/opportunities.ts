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
