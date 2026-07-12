import type { SupabaseClient } from "@supabase/supabase-js";
import type { InternationalResource } from "@/types/international-resource";

export async function getPublishedInternationalResources(
  supabase: SupabaseClient,
): Promise<InternationalResource[]> {
  const { data, error } = await supabase
    .from("international_resources")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as InternationalResource[];
}

export async function getAllInternationalResources(
  supabase: SupabaseClient,
): Promise<InternationalResource[]> {
  const { data, error } = await supabase
    .from("international_resources")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as InternationalResource[];
}
