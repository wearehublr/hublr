import { createClient } from "@/lib/supabase/server";
import { getAllNewsletterArticles } from "@/lib/newsletter-articles";
import AdminSubNav from "../AdminSubNav";
import QuickAddForm from "./QuickAddForm";
import AdminArticleRow from "./AdminArticleRow";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const supabase = await createClient();
  const articles = await getAllNewsletterArticles(supabase);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <AdminSubNav />
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
        Admin — Newsletter
      </h1>

      <div className="flex flex-col gap-8">
        <QuickAddForm />

        <div>
          <h2 className="text-sm font-semibold mb-3">
            All articles ({articles.length})
          </h2>
          <div className="flex flex-col gap-3">
            {articles.map((a) => (
              <AdminArticleRow key={a.id} article={a} />
            ))}
            {articles.length === 0 && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No articles yet — add one above.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
