"use server";

import { createClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email";
import {
  SUBMISSION_TYPES,
  SUBMISSION_TYPE_LABELS,
  type SubmissionType,
} from "@/types/contact-submission";

export type FormState = { error: string | null; success: boolean };

async function notifyAdmin(fields: {
  submission_type: SubmissionType;
  name: string;
  email: string;
  message: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  await sendEmail({
    to: adminEmail,
    subject: `New Work With Us submission: ${fields.name}`,
    text: [
      `Type: ${SUBMISSION_TYPE_LABELS[fields.submission_type]}`,
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      fields.message ? `Message: ${fields.message}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

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

  await notifyAdmin({ submission_type, name, email, message });

  return { error: null, success: true };
}
