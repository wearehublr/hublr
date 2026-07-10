import type { SupabaseClient } from "@supabase/supabase-js";
import type { ContactSubmission } from "@/types/contact-submission";

export async function getAllContactSubmissions(
  supabase: SupabaseClient,
): Promise<ContactSubmission[]> {
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as ContactSubmission[];
}
