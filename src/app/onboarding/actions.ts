"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { MAX_INTERESTED_INDUSTRIES } from "@/types/profile";
import { CATEGORIES, REGIONS, type Category, type Region } from "@/types/opportunity";

export type OnboardingState = { error: string | null };

function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}

function isRegion(value: string): value is Region {
  return (REGIONS as readonly string[]).includes(value);
}

export async function completeOnboarding(
  _prevState: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const sponsorshipRaw = formData.get("requires_sponsorship");
  if (sponsorshipRaw !== "yes" && sponsorshipRaw !== "no") {
    return { error: "Please answer the visa sponsorship question." };
  }

  const interested_industries = formData
    .getAll("interested_industries")
    .map(String)
    .slice(0, MAX_INTERESTED_INDUSTRIES);

  const preferred_categories = formData
    .getAll("preferred_categories")
    .map(String)
    .filter(isCategory)
    .slice(0, 3);

  const preferred_regions = formData
    .getAll("preferred_regions")
    .map(String)
    .filter(isRegion)
    .slice(0, 2);

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    interested_industries,
    preferred_categories,
    preferred_regions,
    requires_sponsorship: sponsorshipRaw === "yes",
    onboarding_completed_at: new Date().toISOString(),
  });

  if (error) return { error: error.message };

  revalidatePath("/opportunities");
  revalidatePath("/");

  const rawNext = String(formData.get("next") ?? "");
  const next = rawNext.startsWith("/") ? rawNext : "/opportunities";
  redirect(next);
}
