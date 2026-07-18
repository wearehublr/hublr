import { createClient } from "@/lib/supabase/server";
import { getPublishedNewsletterArticles } from "@/lib/newsletter-articles";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a) => (
            <a
              key={a.id}
              href={a.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-neutral-200 dark:border-neutral-800 p-4"
            >
              <span className="block h-1 w-10 bg-brand-light dark:bg-brand mb-3" />
              <h2 className="font-semibold group-hover:underline">
                {a.title}
              </h2>
              {a.description && (
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {a.description}
                </p>
              )}
              {a.published_date && (
                <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
                  {new Date(a.published_date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
