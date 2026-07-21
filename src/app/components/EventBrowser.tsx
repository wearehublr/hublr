"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { HublrEvent } from "@/types/event";
import {
  EVENT_TYPES,
  EVENT_TYPE_LABELS,
  LOCATION_TYPES,
  LOCATION_TYPE_LABELS,
  type EventType,
  type LocationType,
} from "@/types/event";
import DeadlineBadge from "@/app/components/DeadlineBadge";
import CompanyLogo from "@/app/components/CompanyLogo";
import { buildEventSlug } from "@/lib/slug";
import { compareByDate } from "@/lib/sort-by-date";

const SORT_OPTIONS = ["date", "company", "newest"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];
const SORT_LABELS: Record<SortOption, string> = {
  date: "Sort: Soonest event",
  company: "Sort: Company A-Z",
  newest: "Sort: Newest added",
};

function daysUntil(eventDate: string): number {
  const ms = new Date(eventDate).getTime() - Date.now();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function EventDateBadge({ eventDate }: { eventDate: string }) {
  const date = new Date(eventDate);
  const days = daysUntil(eventDate);
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  let tone = "text-neutral-600 dark:text-neutral-300";
  if (days < 0) tone = "text-neutral-400 line-through";
  else if (days <= 3) tone = "text-red-600 dark:text-red-400 font-medium";
  else if (days <= 14) tone = "text-amber-600 dark:text-amber-400 font-medium";

  return (
    <span className={`text-xs ${tone}`}>
      {formatted}
      {days >= 0 ? ` (${days}d)` : ""}
    </span>
  );
}

export default function EventBrowser({
  events,
  isLoggedIn,
}: {
  events: HublrEvent[];
  isLoggedIn: boolean;
}) {
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState<EventType | "all">("all");
  const [locationType, setLocationType] = useState<LocationType | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("date");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const result = events.filter((e) => {
      if (eventType !== "all" && e.event_type !== eventType) return false;
      if (locationType !== "all" && e.location_type !== locationType)
        return false;
      if (q && !`${e.title} ${e.location ?? ""}`.toLowerCase().includes(q))
        return false;
      return true;
    });

    const sorted = [...result];
    if (sortBy === "company") {
      sorted.sort((a, b) =>
        (a.company ?? a.title).localeCompare(b.company ?? b.title),
      );
    } else if (sortBy === "newest") {
      sorted.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    } else {
      sorted.sort((a, b) => compareByDate(a.event_date, b.event_date));
    }
    return sorted;
  }, [events, search, eventType, locationType, sortBy]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <input
          type="search"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400"
        />

        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value as EventType | "all")}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          <option value="all">All types</option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {EVENT_TYPE_LABELS[t]}
            </option>
          ))}
        </select>

        <select
          value={locationType}
          onChange={(e) =>
            setLocationType(e.target.value as LocationType | "all")
          }
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          <option value="all">Virtual & in person</option>
          {LOCATION_TYPES.map((l) => (
            <option key={l} value={l}>
              {LOCATION_TYPE_LABELS[l]}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {SORT_LABELS[s]}
            </option>
          ))}
        </select>

        <span className="sm:ml-auto text-sm text-neutral-500 dark:text-neutral-400">
          {filtered.length} of {events.length} events
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 py-12 text-center">
          No events match your filters.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((e) => (
            <li
              key={e.id}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 flex flex-col gap-2 bg-white dark:bg-neutral-900"
            >
              <Link
                href={`/event/${buildEventSlug(e)}`}
                className="flex items-start gap-3 hover:underline"
              >
                {e.company && (
                  <CompanyLogo company={e.company} logoUrl={e.logo_url} size={32} />
                )}
                <div className="min-w-0">
                  {e.company && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-tight">
                      {e.company}
                    </p>
                  )}
                  <p className="font-semibold leading-tight">{e.title}</p>
                </div>
              </Link>

              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
                  {EVENT_TYPE_LABELS[e.event_type]}
                </span>
                <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
                  {LOCATION_TYPE_LABELS[e.location_type]}
                  {e.location ? ` · ${e.location}` : ""}
                </span>
              </div>

              <EventDateBadge eventDate={e.event_date} />
              {e.deadline && <DeadlineBadge deadline={e.deadline} />}

              {e.description && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {e.description}
                </p>
              )}

              {e.registration_url &&
                (isLoggedIn ? (
                  <a
                    href={e.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-3 py-1.5 hover:opacity-90"
                  >
                    Register
                  </a>
                ) : (
                  <a
                    href="/login?next=/events"
                    className="mt-auto inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-1.5"
                  >
                    Log in to register
                  </a>
                ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
