import type { SupabaseClient } from "@supabase/supabase-js";
import type { WaitlistSignup } from "@/types/waitlist-signup";

export async function getAllWaitlistSignups(
  supabase: SupabaseClient,
): Promise<WaitlistSignup[]> {
  const { data, error } = await supabase
    .from("waitlist_signups")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as WaitlistSignup[];
}
