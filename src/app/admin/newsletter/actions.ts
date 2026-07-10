"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== "string" || v.trim() === "") return null;
  return v.trim();
}

export type FormState = { error: string | null };

export async function addArticle(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await requireAdmin();

  const title = str(formData, "title");
  const link_url = str(formData, "link_url");
  if (!title || !link_url) {
    return { error: "Title and link URL are required." };
  }

  const { error } = await supabase.from("newsletter_articles").insert({
    title,
    link_url,
    description: str(formData, "description"),
    published_date: str(formData, "published_date"),
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/newsletter");
  revalidatePath("/");
  return { error: null };
}

export async function updateArticle(id: string, formData: FormData) {
  const supabase = await requireAdmin();

  const { error } = await supabase
    .from("newsletter_articles")
    .update({
      title: str(formData, "title"),
      link_url: str(formData, "link_url"),
      description: str(formData, "description"),
      published_date: str(formData, "published_date"),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/newsletter");
  revalidatePath("/");
}

export async function toggleArticlePublish(id: string, isPublished: boolean) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("newsletter_articles")
    .update({ is_published: isPublished })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/newsletter");
  revalidatePath("/");
}

export async function deleteArticle(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("newsletter_articles")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/newsletter");
  revalidatePath("/");
}
