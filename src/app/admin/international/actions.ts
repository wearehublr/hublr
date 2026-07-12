"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { INTL_RESOURCE_TYPES, type IntlResourceType } from "@/types/international-resource";

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== "string" || v.trim() === "") return null;
  return v.trim();
}

export type FormState = { error: string | null };

export async function addResource(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await requireAdmin();

  const title = str(formData, "title");
  const resource_type = str(formData, "resource_type") as IntlResourceType | null;
  const link_url = str(formData, "link_url");

  if (!title || !resource_type || !link_url) {
    return { error: "Title, type, and link URL are required." };
  }
  if (!INTL_RESOURCE_TYPES.includes(resource_type)) {
    return { error: "Invalid resource type." };
  }

  const { error } = await supabase.from("international_resources").insert({
    title,
    resource_type,
    link_url,
    description: str(formData, "description"),
    is_paid: formData.get("is_paid") === "on",
    price_label: str(formData, "price_label"),
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/international");
  revalidatePath("/international");
  return { error: null };
}

export async function updateResource(id: string, formData: FormData) {
  const supabase = await requireAdmin();

  const resource_type = str(formData, "resource_type") as IntlResourceType | null;
  if (resource_type && !INTL_RESOURCE_TYPES.includes(resource_type)) {
    throw new Error("Invalid resource type");
  }

  const { error } = await supabase
    .from("international_resources")
    .update({
      title: str(formData, "title"),
      resource_type,
      link_url: str(formData, "link_url"),
      description: str(formData, "description"),
      is_paid: formData.get("is_paid") === "on",
      price_label: str(formData, "price_label"),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/international");
  revalidatePath("/international");
}

export async function toggleResourcePublish(id: string, isPublished: boolean) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("international_resources")
    .update({ is_published: isPublished })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/international");
  revalidatePath("/international");
}

export async function deleteResource(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("international_resources")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/international");
  revalidatePath("/international");
}
