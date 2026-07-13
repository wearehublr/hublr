export const CATEGORIES = [
  "summer_internship",
  "off_cycle",
  "spring_internship",
  "co_op",
  "placement_year",
  "vacation_scheme",
  "insight_program",
  "grad_scheme",
  "training_contract",
  "full_time_analyst",
  "other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  summer_internship: "Summer Internship",
  off_cycle: "Off-Cycle",
  spring_internship: "Spring Internship",
  co_op: "Co-op",
  placement_year: "Placement Year",
  vacation_scheme: "Vacation Scheme",
  insight_program: "Insight Programme (Year 12/13)",
  grad_scheme: "Grad Scheme",
  training_contract: "Training Contract",
  full_time_analyst: "Full-Time / Analyst",
  other: "Other",
};

export const REGIONS = ["uk", "eu", "us", "other"] as const;

export type Region = (typeof REGIONS)[number];

export const REGION_LABELS: Record<Region, string> = {
  uk: "UK",
  eu: "EU",
  us: "US",
  other: "Other",
};

export const STATUSES = ["open", "upcoming", "closed", "rolling"] as const;

export type Status = (typeof STATUSES)[number];

export const STATUS_LABELS: Record<Status, string> = {
  open: "Open",
  upcoming: "Upcoming",
  closed: "Closed",
  rolling: "Rolling",
};

export const VISA_SPONSORSHIP_OPTIONS = ["yes", "no", "unknown"] as const;

export type VisaSponsorship = (typeof VISA_SPONSORSHIP_OPTIONS)[number];

export const VISA_SPONSORSHIP_LABELS: Record<VisaSponsorship, string> = {
  yes: "Sponsors visas",
  no: "No visa sponsorship",
  unknown: "Unknown",
};

export interface Opportunity {
  id: string;
  company: string;
  role_title: string;
  category: Category;
  region: Region;
  logo_url: string | null;
  country: string | null;
  city: string | null;
  industry: string | null;
  cycle_year: number;
  status: Status;
  open_date: string | null;
  deadline: string | null;
  apply_url: string;
  notes: string | null;
  full_description: string | null;
  visa_sponsorship: VisaSponsorship;
  source_url: string | null;
  discovered_via: "manual" | "auto";
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type OpportunityInput = Pick<
  Opportunity,
  "company" | "role_title" | "category" | "region" | "apply_url"
> &
  Partial<
    Pick<
      Opportunity,
      | "logo_url"
      | "country"
      | "city"
      | "industry"
      | "cycle_year"
      | "status"
      | "open_date"
      | "deadline"
      | "notes"
      | "full_description"
      | "visa_sponsorship"
      | "source_url"
      | "is_published"
    >
  >;
