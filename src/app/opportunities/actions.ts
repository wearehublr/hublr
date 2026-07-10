"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function trackApplication(opportunityId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: opportunity, error: fetchError } = await supabase
    .from("opportunities")
    .select("*")
    .eq("id", opportunityId)
    .single();

  if (fetchError || !opportunity) throw new Error("Opportunity not found.");

  const { error } = await supabase.from("applications").insert({
    user_id: user.id,
    opportunity_id: opportunity.id,
    company: opportunity.company,
    role_title: opportunity.role_title,
    apply_url: opportunity.apply_url,
    cycle_year: opportunity.cycle_year,
    deadline: opportunity.deadline,
    stage: "saved",
  });

  // 23505 = unique_violation, already tracked, nothing to do.
  if (error && error.code !== "23505") {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
}
