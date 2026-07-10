import type { SupabaseClient } from "@supabase/supabase-js";
import type { Testimonial } from "@/types/testimonial";

export async function getPublishedTestimonials(
  supabase: SupabaseClient,
): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Testimonial[];
}

export async function getAllTestimonials(
  supabase: SupabaseClient,
): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Testimonial[];
}
