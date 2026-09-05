export const RESOURCE_TYPES = ["guide", "newsletter", "other"] as const;

export type ResourceType = (typeof RESOURCE_TYPES)[number];

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  guide: "Guide",
  newsletter: "Newsletter",
  other: "Other",
};

export const INTERVIEW_TOPICS = [
  "hirevue",
  "assessment_centre",
  "case_study",
  "competency",
  "technical",
  "general",
] as const;

export type InterviewTopic = (typeof INTERVIEW_TOPICS)[number];

export const INTERVIEW_TOPIC_LABELS: Record<InterviewTopic, string> = {
  hirevue: "HireVue",
  assessment_centre: "Assessment Centre",
  case_study: "Case Study",
  competency: "Competency Interview",
  technical: "Technical Interview",
  general: "General",
};

export interface InterviewResource {
  id: string;
  title: string;
  description: string | null;
  resource_type: ResourceType;
  topic: InterviewTopic | null;
  link_url: string;
  is_paid: boolean;
  price_label: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
