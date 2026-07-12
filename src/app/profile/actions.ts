"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
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
