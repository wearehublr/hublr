"use server";

import { createClient } from "@/lib/supabase/server";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendEmail } from "@/lib/email";

export type WaitlistState = { error: string | null; success: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function notifyAdmin(email: string, name: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  await sendEmail({
    to: adminEmail,
    subject: `New waitlist signup: ${name || email}`,
    text: [`Email: ${email}`, name ? `Name: ${name}` : null]
      .filter(Boolean)
      .join("\n"),
  });
}

export async function joinWaitlist(
  _prevState: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();

  if (!email || !EMAIL_RE.test(email)) {
    return { error: "Enter a valid email address.", success: false };
  }

  const turnstileToken = formData.get("cf-turnstile-response");
  const isHuman = await verifyTurnstileToken(
    typeof turnstileToken === "string" ? turnstileToken : null,
  );
  if (!isHuman) {
    return { error: "Verification failed. Please try again.", success: false };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("waitlist_signups").insert({
    email,
    name: name || null,
  });

  // Duplicate email (already on the list) shouldn't read as an error to
  // the user - they're already getting what they asked for.
  if (error && error.code !== "23505") {
    console.error("[waitlist] insert error:", error.message);
    return { error: "Something went wrong. Please try again.", success: false };
  }

  // Only notify on a genuinely new signup, not a repeat submission of an
  // email already on the list.
  if (!error) {
    await notifyAdmin(email, name);
  }

  return { error: null, success: true };
}
