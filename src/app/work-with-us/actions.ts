"use server";

import { createClient } from "@/lib/supabase/server";
import { SUBMISSION_TYPES, type SubmissionType } from "@/types/contact-submission";

export type FormState = { error: string | null; success: boolean };

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const submission_type = formData.get("submission_type") as SubmissionType | null;
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!submission_type || !SUBMISSION_TYPES.includes(submission_type)) {
    return { error: "Please choose an option.", success: false };
  }
  if (!name || !email) {
    return { error: "Name and email are required.", success: false };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert({
    submission_type,
    name,
    email,
    message: message || null,
  });

  if (error) return { error: error.message, success: false };

  return { error: null, success: true };
}
