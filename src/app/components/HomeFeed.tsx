import Link from "next/link";
import type { Application } from "@/types/application";
import { STAGE_LABELS } from "@/types/application";
import type { HublrEvent } from "@/types/event";
import type { InterviewResource } from "@/types/interview-resource";
import type { Document } from "@/types/document";
import { DOC_TYPES, DOC_TYPE_LABELS } from "@/types/document";
import type { SavedSearch } from "@/types/saved-search";
import type { SavedEventWithDetails } from "@/types/saved-event";
import { SAVED_EVENT_STATUS_LABELS } from "@/types/saved-event";
import type { RecommendedMatch } from "@/lib/recommendations";
import type { CompanyEventMatch } from "@/lib/company-event-matches";
import { EVENT_TYPE_LABELS } from "@/types/event";
import { buildEventSlug } from "@/lib/slug";
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
  recommended,
  closingThisWeekCount,
  upcomingEvents,
  recentResources,
  activeApplicationsCount,
  documents,
  savedSearches,
  savedEvents,
  companyEventMatches,
}: {
  name: string;
  upcomingDeadlines: Application[];
  recommended: RecommendedMatch[];
  closingThisWeekCount: number;
  upcomingEvents: HublrEvent[];
  recentResources: InterviewResource[];
  activeApplicationsCount: number;
  documents: Document[];
  savedSearches: SavedSearch[];
  savedEvents: SavedEventWithDetails[];
  companyEventMatches: CompanyEventMatch[];
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
            href="/opportunities"
            value={closingThisWeekCount}
            label="🔥 Closing this week"
          />
          <StatTile
            href="/opportunities"
            value={recommended.filter((r) => r.reasons.length > 0).length}
            label="🎯 Matched to you"
          />
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
            opportunities={recommended}
            events={upcomingEvents}
            resources={recentResources}
          />
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
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-sm truncate">{a.company}</p>
                      <span className="shrink-0 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
                        {STAGE_LABELS[a.stage]}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {a.role_title}
                    </p>
                    <div className="mt-0.5">
                      <DeadlineBadge deadline={a.deadline} />
                    </div>
                    {a.stage === "interview" && (
                      <p className="mt-1 text-xs">
                        Prepping for an interview?{" "}
                        <Link href="/interview-prep" className="underline">
                          Interview Prep
                        </Link>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {companyEventMatches.length > 0 && (
            <div className="rounded-lg border border-brand/30 dark:border-brand-light/30 bg-brand/5 dark:bg-brand-light/5 p-4">
              <h2 className="text-sm font-semibold mb-3">
                🔗 Events from companies you&apos;re tracking
              </h2>
              <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
                {companyEventMatches.map(({ company, event }) => (
                  <li key={event.id} className="py-2.5">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      You&apos;re tracking <strong>{company}</strong>
                    </p>
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {EVENT_TYPE_LABELS[event.event_type]} &middot;{" "}
                      {new Date(event.event_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <Link
                      href={`/event/${buildEventSlug(event)}`}
                      className="text-xs underline"
                    >
                      View event
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
              <h2 className="text-sm font-semibold">My events</h2>
              <Link href="/events" className="text-sm underline">
                Browse
              </Link>
            </div>
            {savedEvents.length === 0 ? (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Save an event from the{" "}
                <Link href="/events" className="underline">
                  events page
                </Link>{" "}
                to keep track of it here.
              </p>
            ) : (
              <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
                {savedEvents.map((s) => (
                  <li key={s.id} className="py-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-sm truncate">
                        {s.events.title}
                      </p>
                      <span className="shrink-0 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
                        {SAVED_EVENT_STATUS_LABELS[s.status]}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {new Date(s.events.event_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </li>
                ))}
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
