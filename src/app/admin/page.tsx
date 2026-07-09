import { createClient } from "@/lib/supabase/server";
import { getAllOpportunities } from "@/lib/opportunities";
import QuickAddForm from "./QuickAddForm";
import AdminOpportunityRow from "./AdminOpportunityRow";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const opportunities = await getAllOpportunities(supabase);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Admin — Opportunity Tracker
        </h1>
      </div>

      <div className="flex flex-col gap-8">
        <QuickAddForm />

        <div>
          <h2 className="text-sm font-semibold mb-3">
            All opportunities ({opportunities.length})
          </h2>
          <div className="flex flex-col gap-3">
            {opportunities.map((o) => (
              <AdminOpportunityRow key={o.id} opportunity={o} />
            ))}
            {opportunities.length === 0 && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No opportunities yet — add one above.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
