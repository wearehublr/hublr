"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email";
import { getOrigin } from "@/lib/get-origin";

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

  const rawNext = String(formData.get("next") ?? "");
  const next = rawNext.startsWith("/") ? rawNext : "/onboarding";

  const origin = await getOrigin();
  const adminSupabase = createAdminClient();
  const { data, error } = await adminSupabase.auth.admin.generateLink({
    type: "signup",
    email,
    password,
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {
    console.error("[signup] generateLink error:", {
      message: error.message,
      status: error.status,
      code: error.code,
      name: error.name,
    });
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

  return { error: null, success: true };
}
