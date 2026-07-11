export const CATEGORIES = [
  "summer_internship",
  "off_cycle",
  "spring_internship",
  "co_op",
  "grad_scheme",
  "full_time_analyst",
  "other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  summer_internship: "Summer Internship",
  off_cycle: "Off-Cycle",
  spring_internship: "Spring Internship",
  co_op: "Co-op",
  grad_scheme: "Grad Scheme",
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

export interface Opportunity {
  id: string;
  company: string;
  role_title: string;
  category: Category;
  region: Region;
  country: string | null;
  city: string | null;
  industry: string | null;
  cycle_year: number;
  status: Status;
  open_date: string | null;
  deadline: string | null;
  apply_url: string;
  notes: string | null;
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
      | "country"
      | "city"
      | "industry"
      | "cycle_year"
      | "status"
      | "open_date"
      | "deadline"
      | "notes"
      | "source_url"
      | "is_published"
    >
  >;
