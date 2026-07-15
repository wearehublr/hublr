"use server";

import { createClient } from "@/lib/supabase/server";
import { getOrigin } from "@/lib/get-origin";

export type SignupState = { error: string | null; success: boolean };

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
  const next = rawNext.startsWith("/") ? rawNext : "/profile";

  const origin = await getOrigin();
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {
    console.error("[signup] Supabase signUp error:", {
      message: error.message,
      status: error.status,
      code: error.code,
      name: error.name,
    });
    const message =
      typeof error.message === "string" && error.message.trim().length > 0
        ? error.message
        : "Something went wrong creating your account. Please try again in a moment.";
    return { error: message, success: false };
  }

  return { error: null, success: true };
}
