import type { SupabaseClient } from "@supabase/supabase-js";
import type { Application } from "@/types/application";

export async function getUserApplications(
  supabase: SupabaseClient,
  userId: string,
): Promise<Application[]> {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", userId)
    .order("deadline", { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data as Application[];
}
