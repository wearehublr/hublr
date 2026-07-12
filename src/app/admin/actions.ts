"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import {
  CATEGORIES,
  REGIONS,
  STATUSES,
  VISA_SPONSORSHIP_OPTIONS,
  type Category,
  type Region,
  type Status,
  type VisaSponsorship,
} from "@/types/opportunity";

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== "string" || v.trim() === "") return null;
  return v.trim();
}

export type FormState = { error: string | null };

export async function addOpportunity(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await requireAdmin();

  const company = str(formData, "company");
  const role_title = str(formData, "role_title");
  const category = str(formData, "category") as Category | null;
  const region = str(formData, "region") as Region | null;
  const apply_url = str(formData, "apply_url");

  if (!company || !role_title || !category || !region || !apply_url) {
    return {
      error: "Company, role, category, region, and apply URL are required.",
    };
  }
  if (!CATEGORIES.includes(category)) return { error: "Invalid category." };
  if (!REGIONS.includes(region)) return { error: "Invalid region." };

  const { error } = await supabase.from("opportunities").insert({
    company,
    role_title,
    category,
    region,
    apply_url,
    logo_url: str(formData, "logo_url"),
    country: str(formData, "country"),
    city: str(formData, "city"),
    industry: str(formData, "industry"),
    notes: str(formData, "notes"),
    full_description: str(formData, "full_description"),
    visa_sponsorship: (str(formData, "visa_sponsorship") as VisaSponsorship | null) ?? "unknown",
    source_url: str(formData, "source_url"),
    deadline: str(formData, "deadline"),
    open_date: str(formData, "open_date"),
    status: (str(formData, "status") as Status | null) ?? "open",
  });

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/");
  return { error: null };
}

export async function updateOpportunity(id: string, formData: FormData) {
  const supabase = await requireAdmin();

  const category = str(formData, "category") as Category | null;
  const region = str(formData, "region") as Region | null;
  const status = str(formData, "status") as Status | null;
  const visa_sponsorship = str(formData, "visa_sponsorship") as VisaSponsorship | null;

  if (category && !CATEGORIES.includes(category)) throw new Error("Invalid category");
  if (region && !REGIONS.includes(region)) throw new Error("Invalid region");
  if (status && !STATUSES.includes(status)) throw new Error("Invalid status");
  if (visa_sponsorship && !VISA_SPONSORSHIP_OPTIONS.includes(visa_sponsorship))
    throw new Error("Invalid visa sponsorship value");

  const { error } = await supabase
    .from("opportunities")
    .update({
      company: str(formData, "company"),
      role_title: str(formData, "role_title"),
      category,
      region,
      logo_url: str(formData, "logo_url"),
      country: str(formData, "country"),
      city: str(formData, "city"),
      industry: str(formData, "industry"),
      status: status ?? undefined,
      visa_sponsorship: visa_sponsorship ?? undefined,
      apply_url: str(formData, "apply_url"),
      notes: str(formData, "notes"),
      full_description: str(formData, "full_description"),
      source_url: str(formData, "source_url"),
      deadline: str(formData, "deadline"),
      open_date: str(formData, "open_date"),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function togglePublish(id: string, isPublished: boolean) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("opportunities")
    .update({ is_published: isPublished })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteOpportunity(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("opportunities").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
}
