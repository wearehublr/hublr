import { createClient } from "@/lib/supabase/server";
import { getPublishedOpportunities } from "@/lib/opportunities";
import OpportunityBrowser from "@/app/components/OpportunityBrowser";

export const dynamic = "force-dynamic";

export default async function OpportunitiesPage() {
  const supabase = await createClient();
  const [{ data: userData }, opportunities] = await Promise.all([
    supabase.auth.getUser(),
    getPublishedOpportunities(supabase),
  ]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Early Career Tracker
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Summer internships, off-cycle, spring internships, co-op, and
          grad/full-time-analyst opportunities across the UK, EU, and US.
        </p>
      </header>

      <OpportunityBrowser
        opportunities={opportunities}
        isLoggedIn={!!userData.user}
      />
    </main>
  );
}
