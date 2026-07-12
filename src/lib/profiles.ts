import type { SupabaseClient } from "@supabase/supabase-js";
import type { Profile } from "@/types/profile";

export async function getProfile(
  supabase: SupabaseClient,
  userId: string,
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  return data as Profile | null;
}

export async function getPreferredName(
  supabase: SupabaseClient,
  userId: string,
): Promise<string | null> {
  const { data } = await supabase
    .from("profiles")
    .select("preferred_name")
    .eq("id", userId)
    .maybeSingle();

  return data?.preferred_name ?? null;
}
