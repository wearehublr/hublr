export const STUDY_YEARS = [
  "1st year",
  "2nd year",
  "3rd year",
  "4th year",
  "Postgraduate",
  "Recent graduate",
] as const;

export type StudyYear = (typeof STUDY_YEARS)[number];

export const STUDENT_STATUSES = ["home", "international"] as const;

export type StudentStatus = (typeof STUDENT_STATUSES)[number];

export const STUDENT_STATUS_LABELS: Record<StudentStatus, string> = {
  home: "Home (UK) student",
  international: "International student",
};

export const INDUSTRIES = [
  "Investment Banking",
  "Private Equity / Venture Capital",
  "Asset & Wealth Management",
  "Consulting",
  "Technology",
  "Law",
  "Accounting & Audit",
  "Marketing & Communications",
  "HR & Talent",
  "Other",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const MAX_INTERESTED_INDUSTRIES = 3;

export interface Profile {
  id: string;
  preferred_name: string | null;
  university: string | null;
  degree: string | null;
  study_year: string | null;
  goal: string | null;
  summary: string | null;
  student_status: StudentStatus | null;
  interested_industries: string[];
  created_at: string;
  updated_at: string;
}
