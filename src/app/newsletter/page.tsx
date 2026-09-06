import { createClient } from "@/lib/supabase/server";
import { getPublishedNewsletterArticles } from "@/lib/newsletter-articles";
import NewsletterBrowser from "@/app/components/NewsletterBrowser";

export const dynamic = "force-dynamic";

export default async function NewsletterPage() {
  const supabase = await createClient();
  const articles = await getPublishedNewsletterArticles(supabase);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Newsletter
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Interview prep guides, student stories, and career advice from the
          Hublr newsletter.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 py-12 text-center">
          No articles published yet.
        </p>
      ) : (
        <NewsletterBrowser articles={articles} />
      )}
    </main>
  );
}
