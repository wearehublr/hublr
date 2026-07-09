"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { DOC_TYPES, type DocType } from "@/types/document";

const BUCKET = "documents";
const MAX_SIZE_BYTES = 8 * 1024 * 1024;

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return { supabase, user };
}

export type UploadState = { error: string | null };

export async function uploadDocument(
  _prevState: UploadState,
  formData: FormData,
): Promise<UploadState> {
  const { supabase, user } = await requireUser();

  const file = formData.get("file");
  const label = String(formData.get("label") ?? "").trim();
  const docType = String(formData.get("doc_type") ?? "cv") as DocType;

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose a file to upload." };
  }
  if (!label) return { error: "Give the document a label." };
  if (!DOC_TYPES.includes(docType)) return { error: "Invalid document type." };
  if (file.size > MAX_SIZE_BYTES) {
    return { error: "File is too large (max 8MB)." };
  }

  const storagePath = `${user.id}/${crypto.randomUUID()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, {
      contentType: file.type || undefined,
    });

  if (uploadError) return { error: uploadError.message };

  const { error: insertError } = await supabase.from("documents").insert({
    user_id: user.id,
    label,
    doc_type: docType,
    storage_path: storagePath,
    file_name: file.name,
    mime_type: file.type || null,
    size_bytes: file.size,
  });

  if (insertError) {
    await supabase.storage.from(BUCKET).remove([storagePath]);
    return { error: insertError.message };
  }

  revalidatePath("/documents");
  return { error: null };
}

export async function getDownloadUrl(documentId: string): Promise<string> {
  const { supabase, user } = await requireUser();

  const { data: doc, error } = await supabase
    .from("documents")
    .select("storage_path")
    .eq("id", documentId)
    .eq("user_id", user.id)
    .single();

  if (error || !doc) throw new Error("Document not found.");

  const { data, error: signError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(doc.storage_path, 60);

  if (signError || !data) throw new Error(signError?.message ?? "Could not create link.");

  return data.signedUrl;
}

export async function deleteDocument(documentId: string) {
  const { supabase, user } = await requireUser();

  const { data: doc, error } = await supabase
    .from("documents")
    .select("storage_path")
    .eq("id", documentId)
    .eq("user_id", user.id)
    .single();

  if (error || !doc) throw new Error("Document not found.");

  await supabase.storage.from(BUCKET).remove([doc.storage_path]);

  const { error: deleteError } = await supabase
    .from("documents")
    .delete()
    .eq("id", documentId)
    .eq("user_id", user.id);

  if (deleteError) throw new Error(deleteError.message);

  revalidatePath("/documents");
}
