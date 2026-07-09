"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { STAGES, type Stage } from "@/types/application";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return { supabase, user };
}

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== "string" || v.trim() === "") return null;
  return v.trim();
}

export type FormState = { error: string | null };

export async function addApplication(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase, user } = await requireUser();

  const company = str(formData, "company");
  const role_title = str(formData, "role_title");
  if (!company || !role_title) {
    return { error: "Company and role are required." };
  }

  const cycleYearRaw = str(formData, "cycle_year");

  const { error } = await supabase.from("applications").insert({
    user_id: user.id,
    company,
    role_title,
    apply_url: str(formData, "apply_url"),
    cycle_year: cycleYearRaw ? Number(cycleYearRaw) : null,
    deadline: str(formData, "deadline"),
    applied_date: str(formData, "applied_date"),
    notes: str(formData, "notes"),
    stage: "saved",
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { error: null };
}

export async function updateApplicationStage(id: string, stage: Stage) {
  const { supabase, user } = await requireUser();
  if (!STAGES.includes(stage)) throw new Error("Invalid stage");

  const { error } = await supabase
    .from("applications")
    .update({ stage })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
}

export async function updateApplication(id: string, formData: FormData) {
  const { supabase, user } = await requireUser();

  const cycleYearRaw = str(formData, "cycle_year");
  const cvDocumentId = str(formData, "cv_document_id");
  const coverLetterDocumentId = str(formData, "cover_letter_document_id");

  const { error } = await supabase
    .from("applications")
    .update({
      company: str(formData, "company"),
      role_title: str(formData, "role_title"),
      apply_url: str(formData, "apply_url"),
      cycle_year: cycleYearRaw ? Number(cycleYearRaw) : null,
      deadline: str(formData, "deadline"),
      applied_date: str(formData, "applied_date"),
      notes: str(formData, "notes"),
      cv_document_id: cvDocumentId,
      cover_letter_document_id: coverLetterDocumentId,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
}

export async function deleteApplication(id: string) {
  const { supabase, user } = await requireUser();

  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
}
