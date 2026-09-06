"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail, getAdminNotificationEmail } from "@/lib/email";
import { getOrigin } from "@/lib/get-origin";
import { verifyTurnstileToken } from "@/lib/turnstile";

async function notifyAdminOfSignup(email: string) {
  const adminEmail = getAdminNotificationEmail();
  if (!adminEmail) return;

  await sendEmail({
    to: adminEmail,
    subject: `New Hublr account: ${email}`,
    text: `${email} just created a Hublr account.`,
  });
}

export type SignupState = { error: string | null; success: boolean };

// Uses the admin API instead of the public signUp() call so we can send the
// confirmation email ourselves via Resend (branded "Hublr", not "Supabase")
// instead of relying on Supabase's own mailer/SMTP config.
export async function signUp(
  _prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required.", success: false };
  }
  if (password.length < 8) {
    return {
      error: "Password must be at least 8 characters.",
      success: false,
    };
  }

  const turnstileToken = formData.get("cf-turnstile-response");
  const isHuman = await verifyTurnstileToken(
    typeof turnstileToken === "string" ? turnstileToken : null,
  );
  if (!isHuman) {
    return {
      error: "Verification failed. Please try again.",
      success: false,
    };
  }

  const rawNext = String(formData.get("next") ?? "");
  const next = rawNext.startsWith("/") ? rawNext : "/onboarding";

  const origin = await getOrigin();
  const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(next)}`;
  const adminSupabase = createAdminClient();
  const { data, error } = await adminSupabase.auth.admin.generateLink({
    type: "signup",
    email,
    password,
    options: { redirectTo },
  });

  if (error) {
    console.error("[signup] generateLink error:", {
      message: error.message,
      status: error.status,
      code: error.code,
      name: error.name,
    });

    if (error.code === "email_exists" || error.code === "user_already_exists") {
      // The account already exists - but if it was never confirmed (e.g.
      // signed up during the period the confirmation email was broken),
      // a flat "already exists" message would leave them stuck unable to
      // log in either. A magiclink probe works for existing users
      // regardless of confirmation status and reports it via
      // data.user.email_confirmed_at, so we can tell the two cases apart
      // and resend a working confirmation link for the unconfirmed case.
      const probe = await adminSupabase.auth.admin.generateLink({
        type: "magiclink",
        email,
        options: { redirectTo },
      });

      if (!probe.error && !probe.data.user.email_confirmed_at) {
        await sendEmail({
          to: email,
          subject: "Confirm your Hublr account",
          text: [
            "Welcome back to Hublr!",
            "",
            "Looks like you started creating an account but haven't confirmed it yet. Click below to confirm your email and finish setting up your account:",
            probe.data.properties.action_link,
            "",
            "If you didn't request this, you can ignore this email.",
          ].join("\n"),
        });
        return { error: null, success: true };
      }
    }

    const message =
      error.code === "email_exists" || error.code === "user_already_exists"
        ? "An account with that email already exists. Try logging in instead."
        : "Something went wrong creating your account. Please try again in a moment.";
    return { error: message, success: false };
  }

  await sendEmail({
    to: email,
    subject: "Confirm your Hublr account",
    text: [
      "Welcome to Hublr!",
      "",
      "Confirm your email to finish setting up your account:",
      data.properties.action_link,
      "",
      "If you didn't create this account, you can ignore this email.",
    ].join("\n"),
  });

  // Fires for a genuinely new account only, not the resend-confirmation
  // branch above for an existing-but-unconfirmed signup.
  await notifyAdminOfSignup(email);

  return { error: null, success: true };
}
