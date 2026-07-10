"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== "string" || v.trim() === "") return null;
  return v.trim();
}

export type FormState = { error: string | null };

export async function addTestimonial(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await requireAdmin();

  const name = str(formData, "name");
  const story = str(formData, "story");
  if (!name || !story) {
    return { error: "Name and story are required." };
  }

  const { error } = await supabase.from("testimonials").insert({
    name,
    story,
    subtitle: str(formData, "subtitle"),
    photo_url: str(formData, "photo_url"),
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { error: null };
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await requireAdmin();

  const { error } = await supabase
    .from("testimonials")
    .update({
      name: str(formData, "name"),
      story: str(formData, "story"),
      subtitle: str(formData, "subtitle"),
      photo_url: str(formData, "photo_url"),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function toggleTestimonialPublish(id: string, isPublished: boolean) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("testimonials")
    .update({ is_published: isPublished })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
