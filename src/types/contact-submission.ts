export const SUBMISSION_TYPES = ["student", "sponsor"] as const;

export type SubmissionType = (typeof SUBMISSION_TYPES)[number];

export const SUBMISSION_TYPE_LABELS: Record<SubmissionType, string> = {
  student: "Student — volunteer / work with us",
  sponsor: "Interested sponsor",
};

export interface ContactSubmission {
  id: string;
  submission_type: SubmissionType;
  name: string;
  email: string;
  message: string | null;
  created_at: string;
}
