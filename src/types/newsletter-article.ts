export interface NewsletterArticle {
  id: string;
  title: string;
  description: string | null;
  link_url: string;
  published_date: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
