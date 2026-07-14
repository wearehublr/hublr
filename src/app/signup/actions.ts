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
    return { error: error.message, success: false };
  }

  return { error: null, success: true };
}
