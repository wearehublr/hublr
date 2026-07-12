export const INTL_RESOURCE_TYPES = ["guide", "newsletter", "other"] as const;

export type IntlResourceType = (typeof INTL_RESOURCE_TYPES)[number];

export const INTL_RESOURCE_TYPE_LABELS: Record<IntlResourceType, string> = {
  guide: "Guide",
  newsletter: "Newsletter",
  other: "Other",
};

export interface InternationalResource {
  id: string;
  title: string;
  description: string | null;
  resource_type: IntlResourceType;
  link_url: string;
  is_paid: boolean;
  price_label: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
