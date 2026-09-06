import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getVisaSponsorshipOpportunities } from "@/lib/opportunities";
import { getPublishedInternationalResources } from "@/lib/international-resources";
import { INTL_RESOURCE_TYPE_LABELS } from "@/types/international-resource";
import { CATEGORY_LABELS, REGION_LABELS } from "@/types/opportunity";
import { buildOpportunitySlug } from "@/lib/slug";
import { SPONSORSHIP_METHODOLOGY } from "@/lib/visa-sponsorship";
import CompanyLogo from "@/app/components/CompanyLogo";
import DeadlineBadge from "@/app/components/DeadlineBadge";
import VisaSponsorshipBadge from "@/app/components/VisaSponsorshipBadge";

export const dynamic = "force-dynamic";

export default async function InternationalPage() {
  const supabase = await createClient();
  const [sponsors, resources] = await Promise.all([
    getVisaSponsorshipOpportunities(supabase),
    getPublishedInternationalResources(supabase),
  ]);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          International Students
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Opportunities known to sponsor visas, plus guidance for
          international applicants.
        </p>
        <Link
          href="/international/guide"
          className="mt-4 inline-flex items-center rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-3 py-1.5 hover:opacity-90"
        >
          Read the full guide: visas, sponsorship &amp; applying →
        </Link>
      </header>

      <section className="mb-10 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5">
        <h2 className="text-sm font-semibold mb-3">How we verify sponsorship status</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
          Every opportunity is labelled with one of three sponsorship statuses,
          shown on its own page along with when it was last checked:
        </p>
        <dl className="flex flex-col gap-2.5 text-sm">
          <div>
            <dt className="font-medium">🟢 Sponsorship available</dt>
            <dd className="text-neutral-600 dark:text-neutral-300">
              {SPONSORSHIP_METHODOLOGY.yes}
            </dd>
          </div>
          <div>
            <dt className="font-medium">🟡 Not confirmed</dt>
            <dd className="text-neutral-600 dark:text-neutral-300">
              {SPONSORSHIP_METHODOLOGY.unconfirmed}
            </dd>
          </div>
          <div>
            <dt className="font-medium">🔴 No sponsorship</dt>
            <dd className="text-neutral-600 dark:text-neutral-300">
              {SPONSORSHIP_METHODOLOGY.no}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mb-12">
        <h2 className="text-sm font-semibold mb-3">
          Companies known to sponsor visas
        </h2>
        {sponsors.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Nothing marked yet. Check back soon, or browse all opportunities
            and filter by visa sponsorship.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sponsors.map((o) => (
              <li
                key={o.id}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4"
              >
                <Link
                  href={`/opportunity/${buildOpportunitySlug(o)}`}
                  className="hover:underline flex items-start gap-3"
                >
                  <CompanyLogo company={o.company} logoUrl={o.logo_url} size={32} />
                  <div className="min-w-0">
                    <p className="font-semibold leading-tight">{o.company}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-tight">
                      {o.role_title}
                    </p>
                  </div>
                </Link>

                <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                  <VisaSponsorshipBadge sponsorship="yes" />
                  <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
                    {o.cycle_year} &middot; {CATEGORY_LABELS[o.category]}
                  </span>
                  <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
                    {REGION_LABELS[o.region]}
                    {o.city ? ` · ${o.city}` : ""}
                  </span>
                </div>

                <div className="mt-1.5">
                  <DeadlineBadge deadline={o.deadline} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-3">Resources &amp; guidance</h2>
        {resources.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Nothing published yet. Check back soon.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resources.map((r) => (
              <li
                key={r.id}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 flex flex-col gap-2 bg-white dark:bg-neutral-900"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold leading-tight">{r.title}</p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      r.is_paid
                        ? "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300"
                        : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300"
                    }`}
                  >
                    {r.is_paid ? r.price_label || "Paid" : "Free"}
                  </span>
                </div>

                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {INTL_RESOURCE_TYPE_LABELS[r.resource_type]}
                </span>

                {r.description && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    {r.description}
                  </p>
                )}

                {r.source_name && (
                  <p className="mt-auto text-xs text-neutral-500 dark:text-neutral-400">
                    Source: {r.source_name}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
