"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  MAX_INTERESTED_INDUSTRIES,
  STUDENT_STATUSES,
  CITIZENSHIP_OPTIONS,
  VISA_STATUSES,
  type StudentStatus,
  type Citizenship,
  type VisaStatus,
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

  const citizenship = str(formData, "citizenship") as Citizenship | null;
  if (citizenship && !CITIZENSHIP_OPTIONS.includes(citizenship)) {
    return { error: "Invalid citizenship." };
  }

  const visa_status =
    citizenship === "other" ? (str(formData, "visa_status") as VisaStatus | null) : null;
  if (visa_status && !VISA_STATUSES.includes(visa_status)) {
    return { error: "Invalid visa status." };
  }

  const visa_expiry = citizenship === "other" ? str(formData, "visa_expiry") : null;

  const graduationYearRaw = str(formData, "graduation_year");
  const graduation_year = graduationYearRaw ? Number(graduationYearRaw) : null;
  if (
    graduation_year !== null &&
    (!Number.isInteger(graduation_year) || graduation_year < 2020 || graduation_year > 2035)
  ) {
    return { error: "Invalid graduation year." };
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
    citizenship,
    visa_status,
    visa_expiry,
    graduation_year,
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
