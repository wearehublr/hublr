import * as Sentry from "@sentry/nextjs";
import { Resend } from "resend";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getEmailNotificationsEnabled } from "@/lib/profiles";

const FROM_ADDRESS = "Hublr <noreply@wearehublr.com>";

// "quota_exceeded" means Resend's daily/monthly sending cap was hit. Bulk
// loops (digest, reminders, alerts) stop on it instead of failing once per
// remaining recipient.
export type SendOutcome = "sent" | "opted_out" | "quota_exceeded" | "failed";

const QUOTA_ERROR_NAMES = new Set(["daily_quota_exceeded", "monthly_quota_exceeded"]);

async function sendWithOutcome(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<SendOutcome> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    const error = new Error("[email] RESEND_API_KEY is not set; skipping send.");
    console.error(error.message);
    Sentry.captureException(error, {
      tags: { source: "email-send", to: options.to },
      extra: { subject: options.subject },
    });
    return "failed";
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: options.to,
      subject: options.subject,
      text: options.text,
      ...(options.html ? { html: options.html } : {}),
    });
    // The Resend SDK returns API-level errors (e.g. unverified domain)
    // in `error` rather than throwing, so this must be checked explicitly.
    if (error) {
      const isQuota = QUOTA_ERROR_NAMES.has(error.name);
      console.error("[email] Resend API returned an error:", error);
      Sentry.captureException(new Error(error.message ?? "Resend API error"), {
        tags: { source: "email-send", to: options.to, ...(isQuota ? { quota: "exceeded" } : {}) },
        extra: { subject: options.subject, resendError: error },
      });
      return isQuota ? "quota_exceeded" : "failed";
    }
    return "sent";
  } catch (err) {
    console.error("[email] Failed to send email:", err);
    Sentry.captureException(err, {
      tags: { source: "email-send", to: options.to },
      extra: { subject: options.subject },
    });
    return "failed";
  }
}

// Returns whether the send actually succeeded. Callers on a critical path
// (e.g. signup confirmation) must check this rather than assuming delivery -
// a swallowed failure here previously left accounts stuck "confirmed: never"
// with no error surfaced anywhere.
async function send(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<boolean> {
  return (await sendWithOutcome(options)) === "sent";
}

// For admin-facing emails (e.g. Work With Us notifications) that aren't
// subject to student email preferences. Returns whether the send succeeded.
export async function sendEmail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<boolean> {
  return send(options);
}

// Where admin-facing notifications (new waitlist signup, Work With Us
// submission, etc.) get sent. Deliberately separate from ADMIN_EMAIL, which
// controls who can log into /admin - repointing notifications should never
// risk locking the founder out of the admin panel.
export function getAdminNotificationEmail(): string | null {
  return process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || null;
}

// For student-facing tracker emails: skips sending if the student has
// opted out, and appends a one-click unsubscribe link.
export async function sendUserEmailWithOutcome(
  supabase: SupabaseClient,
  userId: string,
  options: { to: string; subject: string; text: string },
): Promise<SendOutcome> {
  const enabled = await getEmailNotificationsEnabled(supabase, userId);
  if (!enabled) return "opted_out";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wearehublr.com";
  const text = `${options.text}\n\n---\nManage or stop these emails: ${siteUrl}/unsubscribe/${userId}`;

  return sendWithOutcome({ ...options, text });
}

export async function sendUserEmail(
  supabase: SupabaseClient,
  userId: string,
  options: { to: string; subject: string; text: string },
): Promise<boolean> {
  return (await sendUserEmailWithOutcome(supabase, userId, options)) === "sent";
}
