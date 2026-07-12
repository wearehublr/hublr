import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getVisaSponsorshipOpportunities } from "@/lib/opportunities";
import { getPublishedInternationalResources } from "@/lib/international-resources";
import { INTL_RESOURCE_TYPE_LABELS } from "@/types/international-resource";
import { buildOpportunitySlug } from "@/lib/slug";
import CompanyLogo from "@/app/components/CompanyLogo";

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
      </header>

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
                  <div>
                    <p className="font-semibold leading-tight">{o.company}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-tight">
                      {o.role_title}
                    </p>
                  </div>
                </Link>
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

                <a
                  href={r.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-3 py-1.5 hover:opacity-90"
                >
                  {r.is_paid ? "View guide" : "Read"}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
