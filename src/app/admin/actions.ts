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

export type BulkOpportunityRow = {
  company: string;
  role_title: string;
  category: Category;
  region: Region;
  apply_url: string;
  cycle_year?: number;
  status?: Status;
  visa_sponsorship?: VisaSponsorship;
  deadline?: string | null;
  open_date?: string | null;
  city?: string | null;
  country?: string | null;
  industry?: string | null;
  notes?: string | null;
  full_description?: string | null;
  source_url?: string | null;
  logo_url?: string | null;
};

export type BulkImportResult = { inserted: number; error: string | null };

export async function bulkAddOpportunities(
  rows: BulkOpportunityRow[],
): Promise<BulkImportResult> {
  const supabase = await requireAdmin();

  if (rows.length === 0) return { inserted: 0, error: "No rows to import." };

  for (const row of rows) {
    if (!row.company || !row.role_title || !row.apply_url) {
      return {
        inserted: 0,
        error: "Every row needs company, role_title, and apply_url.",
      };
    }
    if (!CATEGORIES.includes(row.category)) {
      return { inserted: 0, error: `Invalid category: ${row.category}` };
    }
    if (!REGIONS.includes(row.region)) {
      return { inserted: 0, error: `Invalid region: ${row.region}` };
    }
  }

  const { error, count } = await supabase.from("opportunities").insert(
    rows.map((row) => ({
      company: row.company,
      role_title: row.role_title,
      category: row.category,
      region: row.region,
      apply_url: row.apply_url,
      cycle_year: row.cycle_year ?? 2027,
      status: row.status ?? "open",
      visa_sponsorship: row.visa_sponsorship ?? "unknown",
      deadline: row.deadline || null,
      open_date: row.open_date || null,
      city: row.city || null,
      country: row.country || null,
      industry: row.industry || null,
      notes: row.notes || null,
      full_description: row.full_description || null,
      source_url: row.source_url || null,
      logo_url: row.logo_url || null,
    })),
    { count: "exact" },
  );

  if (error) return { inserted: 0, error: error.message };

  revalidatePath("/admin");
  revalidatePath("/");
  return { inserted: count ?? rows.length, error: null };
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
