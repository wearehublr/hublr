export const NEWSLETTER_TOPICS = [
  "hirevue",
  "assessment_centre",
  "hr_interview",
  "cv",
  "cover_letter",
  "general",
] as const;

export type NewsletterTopic = (typeof NEWSLETTER_TOPICS)[number];

export const NEWSLETTER_TOPIC_LABELS: Record<NewsletterTopic, string> = {
  hirevue: "HireVue",
  assessment_centre: "Assessment Centre",
  hr_interview: "HR Interview",
  cv: "CV",
  cover_letter: "Cover Letter",
  general: "General",
};

export interface NewsletterArticle {
  id: string;
  title: string;
  description: string | null;
  link_url: string;
  published_date: string | null;
  topic: NewsletterTopic | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
