import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPublishedOpportunityById } from "@/lib/opportunities";
import { opportunityIdFromSlug } from "@/lib/slug";
import { CATEGORY_LABELS, REGION_LABELS, STATUS_LABELS, VISA_SPONSORSHIP_LABELS } from "@/types/opportunity";
import DeadlineBadge from "@/app/components/DeadlineBadge";
import TrackButton from "@/app/components/TrackButton";
import ApplyButton from "@/app/components/ApplyButton";
import CompanyLogo from "@/app/components/CompanyLogo";

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = opportunityIdFromSlug(slug);

  const supabase = await createClient();
  const [{ data: userData }, opportunity] = await Promise.all([
    supabase.auth.getUser(),
    getPublishedOpportunityById(supabase, id),
  ]);

  if (!opportunity) {
    notFound();
  }

  const location = [opportunity.city, opportunity.country]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/opportunities"
        className="text-sm text-neutral-500 dark:text-neutral-400 hover:underline"
      >
        ← Back to opportunities
      </Link>

      <header className="mt-4 flex items-start gap-4">
        <CompanyLogo company={opportunity.company} logoUrl={opportunity.logo_url} size={56} />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {opportunity.role_title}
          </h1>
          <p className="mt-1 text-lg text-neutral-600 dark:text-neutral-300">
            {opportunity.company}
          </p>
        </div>
      </header>

      <div className="mt-4 flex flex-wrap gap-1.5 text-xs">
        <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
          {CATEGORY_LABELS[opportunity.category]}
        </span>
        <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
          {REGION_LABELS[opportunity.region]}
          {location ? ` · ${location}` : ""}
        </span>
        {opportunity.industry && (
          <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
            {opportunity.industry}
          </span>
        )}
        <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
          {STATUS_LABELS[opportunity.status]}
        </span>
        {opportunity.visa_sponsorship !== "unknown" && (
          <span
            className={
              opportunity.visa_sponsorship === "yes"
                ? "rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-0.5"
                : "rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5"
            }
          >
            {VISA_SPONSORSHIP_LABELS[opportunity.visa_sponsorship]}
          </span>
        )}
      </div>

      <div className="mt-3">
        <DeadlineBadge deadline={opportunity.deadline} />
      </div>

      {opportunity.notes && (
        <p className="mt-6 text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-line">
          {opportunity.notes}
        </p>
      )}

      {opportunity.full_description && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold">Full job description</h2>
          <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-line">
            {opportunity.full_description}
          </p>
        </div>
      )}

      <div className="mt-8 flex gap-2 max-w-sm">
        <ApplyButton
          opportunityId={opportunity.id}
          company={opportunity.company}
          roleTitle={opportunity.role_title}
          isLoggedIn={!!userData.user}
        />
        <TrackButton
          opportunityId={opportunity.id}
          isLoggedIn={!!userData.user}
        />
      </div>
    </main>
  );
}
