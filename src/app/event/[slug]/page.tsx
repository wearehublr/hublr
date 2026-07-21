import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPublishedEventById } from "@/lib/events";
import { eventIdFromSlug } from "@/lib/slug";
import {
  EVENT_TYPE_LABELS,
  LOCATION_TYPE_LABELS,
} from "@/types/event";
import CompanyLogo from "@/app/components/CompanyLogo";
import DeadlineBadge from "@/app/components/DeadlineBadge";

function formatDateTime(date: string): string {
  return new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = eventIdFromSlug(slug);

  const supabase = await createClient();
  const [{ data: userData }, event] = await Promise.all([
    supabase.auth.getUser(),
    getPublishedEventById(supabase, id),
  ]);

  if (!event) {
    notFound();
  }

  const isLoggedIn = !!userData.user;

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/events"
        className="text-sm text-neutral-500 dark:text-neutral-400 hover:underline"
      >
        ← Back to events
      </Link>

      <header className="mt-4 flex items-start gap-4">
        {event.company && (
          <CompanyLogo company={event.company} logoUrl={event.logo_url} size={56} />
        )}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {event.title}
          </h1>
          {event.company && (
            <p className="mt-1 text-lg text-neutral-600 dark:text-neutral-300">
              {event.company}
            </p>
          )}
        </div>
      </header>

      <div className="mt-4 flex flex-wrap gap-1.5 text-xs">
        <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
          {EVENT_TYPE_LABELS[event.event_type]}
        </span>
        <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
          {LOCATION_TYPE_LABELS[event.location_type]}
          {event.location ? ` · ${event.location}` : ""}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 items-center">
        <span className="text-sm text-neutral-700 dark:text-neutral-300">
          {formatDateTime(event.event_date)}
        </span>
        {event.deadline && <DeadlineBadge deadline={event.deadline} />}
      </div>

      {event.description && (
        <p className="mt-6 text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-line">
          {event.description}
        </p>
      )}

      {event.full_description && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold">Full event details</h2>
          <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-line">
            {event.full_description}
          </p>
        </div>
      )}

      {event.registration_url &&
        (isLoggedIn ? (
          <a
            href={event.registration_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-4 py-2 hover:opacity-90"
          >
            Register
          </a>
        ) : (
          <Link
            href="/login?next=/events"
            className="mt-8 inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-4 py-2"
          >
            Log in to register
          </Link>
        ))}
    </main>
  );
}
