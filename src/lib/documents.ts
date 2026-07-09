import type { SupabaseClient } from "@supabase/supabase-js";
import type { Document } from "@/types/document";

export async function getUserDocuments(
  supabase: SupabaseClient,
  userId: string,
): Promise<Document[]> {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Document[];
}
