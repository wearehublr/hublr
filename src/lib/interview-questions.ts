import type { SupabaseClient } from "@supabase/supabase-js";
import type { InterviewQuestion } from "@/types/interview-question";

export async function getPublishedInterviewQuestions(
  supabase: SupabaseClient,
): Promise<InterviewQuestion[]> {
  const { data, error } = await supabase
    .from("interview_questions")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data as InterviewQuestion[];
}

export async function getAllInterviewQuestions(
  supabase: SupabaseClient,
): Promise<InterviewQuestion[]> {
  const { data, error } = await supabase
    .from("interview_questions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as InterviewQuestion[];
}
