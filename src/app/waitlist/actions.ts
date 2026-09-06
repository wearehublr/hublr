"use server";

import { createClient } from "@/lib/supabase/server";
import { verifyTurnstileToken } from "@/lib/turnstile";

export type WaitlistState = { error: string | null; success: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  return { error: null, success: true };
}
