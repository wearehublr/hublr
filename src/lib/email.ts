import { Resend } from "resend";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getEmailNotificationsEnabled } from "@/lib/profiles";

const FROM_ADDRESS = "Hublr <notifications@wearehublr.com>";

async function send(options: {
  to: string;
  subject: string;
  text: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[email] RESEND_API_KEY is not set; skipping send.");
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: options.to,
      subject: options.subject,
      text: options.text,
    });
    // The Resend SDK returns API-level errors (e.g. unverified domain)
    // in `error` rather than throwing, so this must be checked explicitly.
    if (error) {
      console.error("[email] Resend API returned an error:", error);
    }
  } catch (err) {
    // Email delivery is a nice-to-have, never block the calling action on it.
    console.error("[email] Failed to send email:", err);
  }
}

// For admin-facing emails (e.g. Work With Us notifications) that aren't
// subject to student email preferences.
export async function sendEmail(options: {
  to: string;
  subject: string;
  text: string;
}): Promise<void> {
  return send(options);
}

// For student-facing tracker emails: skips sending if the student has
// opted out, and appends a one-click unsubscribe link.
export async function sendUserEmail(
  supabase: SupabaseClient,
  userId: string,
  options: { to: string; subject: string; text: string },
): Promise<boolean> {
  const enabled = await getEmailNotificationsEnabled(supabase, userId);
  if (!enabled) return false;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wearehublr.com";
  const text = `${options.text}\n\n---\nManage or stop these emails: ${siteUrl}/unsubscribe/${userId}`;

  await send({ ...options, text });
  return true;
}
