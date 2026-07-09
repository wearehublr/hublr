export const STAGES = [
  "saved",
  "applied",
  "oa_assessment",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
] as const;

export type Stage = (typeof STAGES)[number];

export const STAGE_LABELS: Record<Stage, string> = {
  saved: "Saved",
  applied: "Applied",
  oa_assessment: "OA / Assessment",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

export interface Application {
  id: string;
  user_id: string;
  opportunity_id: string | null;
  company: string;
  role_title: string;
  apply_url: string | null;
  cycle_year: number | null;
  stage: Stage;
  applied_date: string | null;
  deadline: string | null;
  notes: string | null;
  cv_document_id: string | null;
  cover_letter_document_id: string | null;
  reminder_sent_at: string | null;
  created_at: string;
  updated_at: string;
}
