"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SavedSearchFilters = {
  region: string | null;
  category: string | null;
  visaSponsorship: string | null;
  industry: string | null;
  keyword: string | null;
};

export async function saveSearch(label: string, filters: SavedSearchFilters) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("saved_searches").insert({
    user_id: user.id,
    label,
    region: filters.region,
    category: filters.category,
    visa_sponsorship: filters.visaSponsorship,
    industry: filters.industry,
    keyword: filters.keyword,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}

export async function deleteSavedSearch(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("saved_searches")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
}
