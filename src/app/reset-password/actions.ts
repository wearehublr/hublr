"use server";

import { createClient } from "@/lib/supabase/server";
import { getOrigin } from "@/lib/get-origin";

export type ResetState = { error: string | null; success: boolean };

export async function requestPasswordReset(
  _prevState: ResetState,
  formData: FormData,
): Promise<ResetState> {
  const email = String(formData.get("email") ?? "");
  if (!email) return { error: "Email is required.", success: false };

  const origin = await getOrigin();
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/update-password`,
  });

  // Always report success, whether or not the email exists, so we don't leak
  // which addresses have accounts.
  return { error: null, success: true };
}
