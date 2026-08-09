import { createClient } from "@/lib/supabase/server";
import { getAllOpportunities } from "@/lib/opportunities";
import AdminSubNav from "./AdminSubNav";
import QuickAddForm from "./QuickAddForm";
import BulkImportForm from "./BulkImportForm";
import AdminOpportunityRow from "./AdminOpportunityRow";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const opportunities = await getAllOpportunities(supabase);

  const pendingReview = opportunities.filter(
    (o) => o.discovered_via === "auto" && !o.is_published,
  );
  const rest = opportunities.filter(
    (o) => !(o.discovered_via === "auto" && !o.is_published),
  );

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <AdminSubNav />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Admin: Opportunity Tracker
        </h1>
      </div>

      <div className="flex flex-col gap-8">
        <QuickAddForm />
        <BulkImportForm />

        {pendingReview.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold mb-3">
              Pending review ({pendingReview.length})
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
              Auto-discovered drafts. Category, cycle year, and region are
              placeholders — check and correct them before hitting Publish.
            </p>
            <div className="flex flex-col gap-3">
              {pendingReview.map((o) => (
                <AdminOpportunityRow key={o.id} opportunity={o} />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-sm font-semibold mb-3">
            All opportunities ({rest.length})
          </h2>
          <div className="flex flex-col gap-3">
            {rest.map((o) => (
              <AdminOpportunityRow key={o.id} opportunity={o} />
            ))}
            {rest.length === 0 && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No opportunities yet. Add one above.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
