export const DOC_TYPES = ["cv", "cover_letter", "other"] as const;

export type DocType = (typeof DOC_TYPES)[number];

export const DOC_TYPE_LABELS: Record<DocType, string> = {
  cv: "CV",
  cover_letter: "Cover Letter",
  other: "Other",
};

export interface Document {
  id: string;
  user_id: string;
  label: string;
  doc_type: DocType;
  storage_path: string;
  file_name: string;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
}
