import Link from "next/link";
import type { Application } from "@/types/application";
import type { Opportunity } from "@/types/opportunity";
import type { HublrEvent } from "@/types/event";
import type { InterviewResource } from "@/types/interview-resource";
import type { Document } from "@/types/document";
import { DOC_TYPES, DOC_TYPE_LABELS } from "@/types/document";
import type { SavedSearch } from "@/types/saved-search";
import type { NewsletterArticle } from "@/types/newsletter-article";
import DeadlineBadge from "@/app/components/DeadlineBadge";
import RecommendedFeed from "@/app/components/RecommendedFeed";

function StatTile({
  href,
  value,
  label,
}: {
  href: string;
  value: number;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex-1 min-w-[140px] rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:border-brand-light dark:hover:border-brand"
    >
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
    </Link>
  );
}

export default function HomeFeed({
  name,
  upcomingDeadlines,
  recentOpportunities,
  upcomingEvents,
  recentResources,
  activeApplicationsCount,
  documents,
  savedSearches,
  newsletterArticles,
}: {
  name: string;
  upcomingDeadlines: Application[];
  recentOpportunities: Opportunity[];
  upcomingEvents: HublrEvent[];
  recentResources: InterviewResource[];
  activeApplicationsCount: number;
  documents: Document[];
  savedSearches: SavedSearch[];
  newsletterArticles: NewsletterArticle[];
}) {
  return (
    <main className="flex-1">
      <div className="bg-cream dark:bg-cream-dark border-b border-brand-light/40 dark:border-brand/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Home
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">
            Hello, {name} 👋
          </h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6">
        <div className="flex flex-wrap gap-4">
          <StatTile
            href="/dashboard"
            value={activeApplicationsCount}
            label="Active applications"
          />
          <StatTile
            href="/documents"
            value={documents.length}
            label="Documents"
          />
          <StatTile
            href="/dashboard"
            value={savedSearches.length}
            label="Job alerts"
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <RecommendedFeed
            opportunities={recentOpportunities}
            events={upcomingEvents}
            resources={recentResources}
          />

          {newsletterArticles.length > 0 && (
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-sm font-semibold">Latest from the newsletter</h2>
                <Link href="/newsletter" className="text-sm underline">
                  See all
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {newsletterArticles.map((a) => (
                  <a
                    key={a.id}
                    href={a.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border border-neutral-200 dark:border-neutral-800 p-4"
                  >
                    <span className="block h-1 w-10 bg-brand-light dark:bg-brand mb-3" />
                    <h3 className="text-sm font-semibold group-hover:underline">
                      {a.title}
                    </h3>
                    {a.description && (
                      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        {a.description}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <h2 className="text-sm font-semibold mb-3">Upcoming deadlines</h2>
            {upcomingDeadlines.length === 0 ? (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Deadlines in the next 2 weeks will appear here once you track
                opportunities in your{" "}
                <Link href="/dashboard" className="underline">
                  Application Tracker
                </Link>
                .
              </p>
            ) : (
              <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
                {upcomingDeadlines.map((a) => (
                  <li key={a.id} className="py-2.5">
                    <p className="font-medium text-sm truncate">{a.company}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {a.role_title}
                    </p>
                    <div className="mt-0.5">
                      <DeadlineBadge deadline={a.deadline} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-sm font-semibold">Your documents</h2>
              <Link href="/documents" className="text-sm underline">
                Manage
              </Link>
            </div>
            {documents.length === 0 ? (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No documents uploaded yet.
              </p>
            ) : (
              <ul className="flex flex-col gap-1 text-sm">
                {DOC_TYPES.map((type) => {
                  const count = documents.filter(
                    (d) => d.doc_type === type,
                  ).length;
                  if (count === 0) return null;
                  return (
                    <li key={type} className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-300">
                        {DOC_TYPE_LABELS[type]}
                      </span>
                      <span className="font-medium">{count}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-sm font-semibold">Job alerts</h2>
              <Link href="/dashboard" className="text-sm underline">
                Manage
              </Link>
            </div>
            {savedSearches.length === 0 ? (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Save a search from the{" "}
                <Link href="/opportunities" className="underline">
                  opportunities page
                </Link>{" "}
                to get notified about new matches.
              </p>
            ) : (
              <ul className="flex flex-col gap-1.5 text-sm">
                {savedSearches.map((s) => (
                  <li key={s.id} className="truncate">
                    {s.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <h2 className="text-sm font-semibold mb-3">Quick links</h2>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/dashboard" className="underline">
                Application Tracker
              </Link>
              <Link href="/interview-prep" className="underline">
                Interview Prep
              </Link>
              <Link href="/newsletter" className="underline">
                Newsletter
              </Link>
              <Link href="/book" className="underline">
                Book a meeting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
