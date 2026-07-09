import Link from "next/link";
import type { Application } from "@/types/application";
import type { Opportunity } from "@/types/opportunity";
import type { HublrEvent } from "@/types/event";
import { CATEGORY_LABELS, REGION_LABELS } from "@/types/opportunity";
import { EVENT_TYPE_LABELS } from "@/types/event";
import DeadlineBadge from "@/app/components/DeadlineBadge";

export default function HomeFeed({
  name,
  upcomingDeadlines,
  recentOpportunities,
  upcomingEvents,
}: {
  name: string;
  upcomingDeadlines: Application[];
  recentOpportunities: Opportunity[];
  upcomingEvents: HublrEvent[];
}) {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Welcome back, {name}
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Here&apos;s what&apos;s new and what&apos;s coming up.
        </p>
      </header>

      <div className="flex flex-col gap-10">
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Upcoming deadlines</h2>
            <Link
              href="/dashboard"
              className="text-sm underline text-neutral-500 dark:text-neutral-400"
            >
              View all applications
            </Link>
          </div>
          {upcomingDeadlines.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Nothing due soon.{" "}
              <Link href="/opportunities/2027" className="underline">
                Browse opportunities
              </Link>{" "}
              to start tracking.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
              {upcomingDeadlines.map((a) => (
                <li key={a.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{a.company}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                      {a.role_title}
                    </p>
                  </div>
                  <DeadlineBadge deadline={a.deadline} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">New opportunities</h2>
            <Link
              href="/opportunities/2027"
              className="text-sm underline text-neutral-500 dark:text-neutral-400"
            >
              View all
            </Link>
          </div>
          {recentOpportunities.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Nothing published yet — check back soon.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
              {recentOpportunities.map((o) => (
                <li key={o.id} className="py-3">
                  <p className="font-medium">
                    {o.company} — {o.role_title}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {CATEGORY_LABELS[o.category]} · {REGION_LABELS[o.region]}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Upcoming events</h2>
            <Link
              href="/events"
              className="text-sm underline text-neutral-500 dark:text-neutral-400"
            >
              View all
            </Link>
          </div>
          {upcomingEvents.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Nothing on the calendar yet — check back soon.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
              {upcomingEvents.map((e) => (
                <li key={e.id} className="py-3">
                  <p className="font-medium">{e.title}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {EVENT_TYPE_LABELS[e.event_type]} ·{" "}
                    {new Date(e.event_date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="flex flex-wrap gap-3">
          <Link
            href="/documents"
            className="rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-1.5"
          >
            Manage documents
          </Link>
          <Link
            href="/interview-prep"
            className="rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-1.5"
          >
            Interview prep
          </Link>
          <Link
            href="/book"
            className="rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-1.5"
          >
            Book a meeting
          </Link>
        </section>
      </div>
    </main>
  );
}
