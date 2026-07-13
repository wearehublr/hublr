"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  MAX_INTERESTED_INDUSTRIES,
  STUDENT_STATUSES,
  type StudentStatus,
} from "@/types/profile";

export type FormState = { error: string | null };

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== "string" || v.trim() === "") return null;
  return v.trim();
}

export async function updateProfile(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const student_status = str(formData, "student_status") as StudentStatus | null;
  if (student_status && !STUDENT_STATUSES.includes(student_status)) {
    return { error: "Invalid student status." };
  }

  const interested_industries = formData
    .getAll("interested_industries")
    .map(String)
    .slice(0, MAX_INTERESTED_INDUSTRIES);

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    preferred_name: str(formData, "preferred_name"),
    university: str(formData, "university"),
    degree: str(formData, "degree"),
    study_year: str(formData, "study_year"),
    goal: str(formData, "goal"),
    summary: str(formData, "summary"),
    student_status,
    interested_industries,
    email_notifications_enabled: formData.get("email_notifications_enabled") === "on",
  });

  if (error) return { error: error.message };

  revalidatePath("/profile");
  return { error: null };
}

export type DeleteAccountState = { error: string | null };

export async function deleteAccount(
  _prevState: DeleteAccountState,
  formData: FormData,
): Promise<DeleteAccountState> {
  const confirmation = String(formData.get("confirmation") ?? "");
  if (confirmation !== "DELETE") {
    return { error: 'Type "DELETE" exactly to confirm.' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Remove uploaded files first; deleting the DB rows (via cascade below)
  // wouldn't clean up the actual storage objects.
  const { data: documents } = await supabase
    .from("documents")
    .select("storage_path")
    .eq("user_id", user.id);

  if (documents && documents.length > 0) {
    await supabase.storage
      .from("documents")
      .remove(documents.map((d) => d.storage_path));
  }

  await supabase.auth.signOut();

  const adminSupabase = createAdminClient();
  const { error } = await adminSupabase.auth.admin.deleteUser(user.id);
  if (error) return { error: error.message };

  redirect("/account-deleted");
}
