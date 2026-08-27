export const STUDY_YEARS = [
  "Year 12",
  "Year 13",
  "Sixth Form",
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

export const CITIZENSHIP_OPTIONS = ["uk", "irish", "other"] as const;

export type Citizenship = (typeof CITIZENSHIP_OPTIONS)[number];

export const CITIZENSHIP_LABELS: Record<Citizenship, string> = {
  uk: "UK citizen",
  irish: "Irish citizen",
  other: "Other",
};

export const VISA_STATUSES = [
  "none",
  "student_visa",
  "graduate_visa",
  "skilled_worker_visa",
  "spouse_visa",
  "ilr_settled",
  "other",
] as const;

export type VisaStatus = (typeof VISA_STATUSES)[number];

export const VISA_STATUS_LABELS: Record<VisaStatus, string> = {
  none: "No visa yet",
  student_visa: "Student visa",
  graduate_visa: "Graduate visa",
  skilled_worker_visa: "Skilled Worker visa",
  spouse_visa: "Spouse/partner visa",
  ilr_settled: "Indefinite Leave to Remain / Settled status",
  other: "Other visa type",
};

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
  email_notifications_enabled: boolean;
  citizenship: Citizenship | null;
  visa_status: VisaStatus | null;
  visa_expiry: string | null;
  graduation_year: number | null;
  created_at: string;
  updated_at: string;
}
