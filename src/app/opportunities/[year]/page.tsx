import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/get-user";
import { getPublishedOpportunitiesByYear } from "@/lib/opportunities";
import { getProfile } from "@/lib/profiles";
import { getUserApplications } from "@/lib/applications";
import { countSavedAndInProgress } from "@/lib/deadlines";
import OpportunityBrowser from "@/app/components/OpportunityBrowser";

const SUPPORTED_YEARS = [2026, 2027];

export function generateStaticParams() {
  return SUPPORTED_YEARS.map((year) => ({ year: String(year) }));
}

export default async function OpportunitiesByYearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year: yearParam } = await params;
  const year = Number(yearParam);

  if (!SUPPORTED_YEARS.includes(year)) {
    notFound();
  }

  const supabase = await createClient();
  const [user, opportunities] = await Promise.all([
    getUser(supabase),
    getPublishedOpportunitiesByYear(supabase, year),
  ]);
  const profile = user
    ? await getProfile(supabase, user.id)
    : null;

  if (user && !profile?.onboarding_completed_at) {
    redirect(`/onboarding?next=${encodeURIComponent(`/opportunities/${year}`)}`);
  }

  const { saved: savedCount, inProgress: inProgressCount } = user
    ? countSavedAndInProgress(await getUserApplications(supabase, user.id))
    : { saved: 0, inProgress: 0 };

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {year} Early Career Tracker
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Summer internships, off-cycle, spring internships, co-op, and
          grad/full-time-analyst opportunities for the {year} cycle across
          the UK, EU, and US.
        </p>
      </header>

      <OpportunityBrowser
        opportunities={opportunities}
        isLoggedIn={!!user}
        initialIndustry={profile?.interested_industries?.[0] ?? null}
        initialCategory={profile?.preferred_categories?.[0] ?? null}
        initialRegion={profile?.preferred_regions?.[0] ?? null}
        initialRequiresSponsorship={profile?.requires_sponsorship ?? null}
        savedCount={savedCount}
        inProgressCount={inProgressCount}
      />
    </main>
  );
}
