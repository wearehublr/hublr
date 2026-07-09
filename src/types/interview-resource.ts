export const RESOURCE_TYPES = ["guide", "newsletter", "other"] as const;

export type ResourceType = (typeof RESOURCE_TYPES)[number];

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  guide: "Guide",
  newsletter: "Newsletter",
  other: "Other",
};

export interface InterviewResource {
  id: string;
  title: string;
  description: string | null;
  resource_type: ResourceType;
  link_url: string;
  is_paid: boolean;
  price_label: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
