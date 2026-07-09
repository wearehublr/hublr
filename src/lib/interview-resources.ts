import type { SupabaseClient } from "@supabase/supabase-js";
import type { InterviewResource } from "@/types/interview-resource";

export async function getPublishedInterviewResources(
  supabase: SupabaseClient,
): Promise<InterviewResource[]> {
  const { data, error } = await supabase
    .from("interview_resources")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as InterviewResource[];
}

export async function getAllInterviewResources(
  supabase: SupabaseClient,
): Promise<InterviewResource[]> {
  const { data, error } = await supabase
    .from("interview_resources")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as InterviewResource[];
}
