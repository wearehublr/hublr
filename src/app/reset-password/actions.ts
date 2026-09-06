"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email";
import { getOrigin } from "@/lib/get-origin";
import { verifyTurnstileToken } from "@/lib/turnstile";

export type ResetState = { error: string | null; success: boolean };

// Uses the admin API instead of resetPasswordForEmail() so we can send the
// reset email ourselves via Resend (branded "Hublr", not "Supabase")
// instead of relying on Supabase's own mailer/SMTP config.
export async function requestPasswordReset(
  _prevState: ResetState,
  formData: FormData,
): Promise<ResetState> {
  const email = String(formData.get("email") ?? "");
  if (!email) return { error: "Email is required.", success: false };

  const turnstileToken = formData.get("cf-turnstile-response");
  const isHuman = await verifyTurnstileToken(
    typeof turnstileToken === "string" ? turnstileToken : null,
  );
  if (!isHuman) {
    return { error: "Verification failed. Please try again.", success: false };
  }

  const origin = await getOrigin();
  const adminSupabase = createAdminClient();
  const { data, error } = await adminSupabase.auth.admin.generateLink({
    type: "recovery",
    email,
    options: {
      redirectTo: `${origin}/auth/callback?next=/update-password`,
    },
  });

  // Always report success, whether or not the email exists, so we don't leak
  // which addresses have accounts.
  if (!error) {
    await sendEmail({
      to: email,
      subject: "Reset your Hublr password",
      text: [
        "We received a request to reset your Hublr password.",
        "",
        "Set a new password here:",
        data.properties.action_link,
        "",
        "If you didn't request this, you can ignore this email.",
      ].join("\n"),
    });
  }

  return { error: null, success: true };
}
