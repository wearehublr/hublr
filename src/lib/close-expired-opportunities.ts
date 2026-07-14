import type { SupabaseClient } from "@supabase/supabase-js";

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function closeExpiredOpportunities(
  supabase: SupabaseClient,
): Promise<number> {
  const { data, error } = await supabase
    .from("opportunities")
    .update({ status: "closed" })
    .eq("status", "open")
    .lt("deadline", todayIso())
    .select("id");

  if (error || !data) return 0;
  return data.length;
}
