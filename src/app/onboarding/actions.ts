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

// Fired as soon as the student picks their first preference, before they
// submit the full form. This means someone who abandons onboarding partway
// through still has a profile row with preferences set - which is what
// makes them eligible for the weekly match digest (see match-digest.ts's
// hasPreferences() check) - instead of leaving no trace at all.
export async function saveOnboardingProgress(preferences: {
  interested_industries: string[];
  preferred_categories: string[];
  preferred_regions: string[];
}): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const interested_industries = preferences.interested_industries
    .map(String)
    .slice(0, MAX_INTERESTED_INDUSTRIES);
  const preferred_categories = preferences.preferred_categories
    .map(String)
    .filter(isCategory)
    .slice(0, 3);
  const preferred_regions = preferences.preferred_regions
    .map(String)
    .filter(isRegion)
    .slice(0, 2);

  if (
    interested_industries.length === 0 &&
    preferred_categories.length === 0 &&
    preferred_regions.length === 0
  ) {
    return;
  }

  await supabase.from("profiles").upsert({
    id: user.id,
    interested_industries,
    preferred_categories,
    preferred_regions,
  });
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

  if (
    interested_industries.length === 0 &&
    preferred_categories.length === 0 &&
    preferred_regions.length === 0
  ) {
    return { error: "Please pick at least one industry, role type, or region." };
  }

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
