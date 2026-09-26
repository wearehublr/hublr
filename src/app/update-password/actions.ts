"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/get-user";

export type UpdatePasswordState = { error: string | null };

export async function updatePassword(
  _prevState: UpdatePasswordState,
  formData: FormData,
): Promise<UpdatePasswordState> {
  const password = String(formData.get("password") ?? "");
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();
  const user = await getUser(supabase);
  if (!user) {
    return {
      error: "Your reset link has expired. Request a new one from the login page.",
    };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };

  redirect("/dashboard");
}
