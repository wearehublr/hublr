import Link from "next/link";
import type { Application } from "@/types/application";
import type { Opportunity } from "@/types/opportunity";
import type { HublrEvent } from "@/types/event";
import type { InterviewResource } from "@/types/interview-resource";
import DeadlineBadge from "@/app/components/DeadlineBadge";
import RecommendedFeed from "@/app/components/RecommendedFeed";

export default function HomeFeed({
  name,
  upcomingDeadlines,
  recentOpportunities,
  upcomingEvents,
  recentResources,
}: {
  name: string;
  upcomingDeadlines: Application[];
  recentOpportunities: Opportunity[];
  upcomingEvents: HublrEvent[];
  recentResources: InterviewResource[];
}) {
  return (
    <main className="flex-1">
      <div className="bg-indigo-50 dark:bg-indigo-950/30 border-b border-indigo-100 dark:border-indigo-900">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Home
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">
            Hello, {name} 👋
          </h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecommendedFeed
            opportunities={recentOpportunities}
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
            <h2 className="text-sm font-semibold mb-3">Quick links</h2>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/dashboard" className="underline">
                Application Tracker
              </Link>
              <Link href="/documents" className="underline">
                Documents (CV & Cover Letters)
              </Link>
              <Link href="/interview-prep" className="underline">
                Interview Prep
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
