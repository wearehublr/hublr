import type { SupabaseClient } from "@supabase/supabase-js";
import type { SavedSearch } from "@/types/saved-search";

export async function getUserSavedSearches(
  supabase: SupabaseClient,
  userId: string,
): Promise<SavedSearch[]> {
  const { data, error } = await supabase
    .from("saved_searches")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as SavedSearch[];
}

export async function getAllSavedSearches(
  supabase: SupabaseClient,
): Promise<SavedSearch[]> {
  const { data, error } = await supabase.from("saved_searches").select("*");

  if (error) throw error;
  return data as SavedSearch[];
}
