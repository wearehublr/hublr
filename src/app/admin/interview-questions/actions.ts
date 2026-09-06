"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { INTERVIEW_TOPICS, type InterviewTopic } from "@/types/interview-resource";

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== "string" || v.trim() === "") return null;
  return v.trim();
}

export type FormState = { error: string | null };

export async function addQuestion(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await requireAdmin();

  const question = str(formData, "question");
  const answer_1 = str(formData, "answer_1");
  const topic = str(formData, "topic") as InterviewTopic | null;

  if (!question || !answer_1 || !topic) {
    return { error: "Question, sample answer, and topic are required." };
  }
  if (!INTERVIEW_TOPICS.includes(topic)) {
    return { error: "Invalid topic." };
  }

  const { error } = await supabase.from("interview_questions").insert({
    question,
    answer_1,
    answer_1_label: str(formData, "answer_1_label"),
    answer_2: str(formData, "answer_2"),
    answer_2_label: str(formData, "answer_2_label"),
    topic,
    source: str(formData, "source"),
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/interview-questions");
  revalidatePath("/interview-prep");
  return { error: null };
}

export async function updateQuestion(id: string, formData: FormData) {
  const supabase = await requireAdmin();

  const topic = str(formData, "topic") as InterviewTopic | null;
  if (topic && !INTERVIEW_TOPICS.includes(topic)) {
    throw new Error("Invalid topic");
  }

  const { error } = await supabase
    .from("interview_questions")
    .update({
      question: str(formData, "question"),
      answer_1: str(formData, "answer_1"),
      answer_1_label: str(formData, "answer_1_label"),
      answer_2: str(formData, "answer_2"),
      answer_2_label: str(formData, "answer_2_label"),
      topic,
      source: str(formData, "source"),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/interview-questions");
  revalidatePath("/interview-prep");
}

export async function toggleQuestionPublish(id: string, isPublished: boolean) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("interview_questions")
    .update({ is_published: isPublished })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/interview-questions");
  revalidatePath("/interview-prep");
}

export async function deleteQuestion(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("interview_questions")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/interview-questions");
  revalidatePath("/interview-prep");
}
