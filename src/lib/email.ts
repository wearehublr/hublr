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
  if (!apiKey) return;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: options.to,
      subject: options.subject,
      text: options.text,
    });
  } catch {
    // Email delivery is a nice-to-have, never block the calling action on it.
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
