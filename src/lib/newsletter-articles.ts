import type { SupabaseClient } from "@supabase/supabase-js";
import type { NewsletterArticle } from "@/types/newsletter-article";

export async function getPublishedNewsletterArticles(
  supabase: SupabaseClient,
): Promise<NewsletterArticle[]> {
  const { data, error } = await supabase
    .from("newsletter_articles")
    .select("*")
    .eq("is_published", true)
    .order("published_date", { ascending: false, nullsFirst: false });

  if (error) throw error;
  return data as NewsletterArticle[];
}

export async function getAllNewsletterArticles(
  supabase: SupabaseClient,
): Promise<NewsletterArticle[]> {
  const { data, error } = await supabase
    .from("newsletter_articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as NewsletterArticle[];
}
