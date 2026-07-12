"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { Opportunity } from "@/types/opportunity";
import { CATEGORY_LABELS, REGION_LABELS } from "@/types/opportunity";
import type { HublrEvent } from "@/types/event";
import { EVENT_TYPE_LABELS } from "@/types/event";
import type { InterviewResource } from "@/types/interview-resource";
import { RESOURCE_TYPE_LABELS } from "@/types/interview-resource";
import DeadlineBadge from "@/app/components/DeadlineBadge";
import CompanyLogo from "@/app/components/CompanyLogo";
import { trackApplication } from "@/app/opportunities/actions";
import { buildOpportunitySlug } from "@/lib/slug";

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5v15.19a.5.5 0 0 1-.77.42L12 16.5l-5.23 3.61a.5.5 0 0 1-.77-.42V4.5Z"
      />
    </svg>
  );
}

const TABS = ["opportunities", "events", "resources"] as const;
type Tab = (typeof TABS)[number];

const TAB_LABELS: Record<Tab, string> = {
  opportunities: "Opportunities",
  events: "Events",
  resources: "Resources",
};

export default function RecommendedFeed({
  opportunities,
  events,
  resources,
}: {
  opportunities: Opportunity[];
  events: HublrEvent[];
  resources: InterviewResource[];
}) {
  const [tab, setTab] = useState<Tab>("opportunities");
  const [tracked, setTracked] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  function handleTrack(id: string) {
    startTransition(async () => {
      await trackApplication(id);
      setTracked((prev) => new Set(prev).add(id));
    });
  }

  return (
    <section>
      <h2 className="text-sm font-semibold mb-3">Recommended for you</h2>

      <div className="inline-flex rounded-md border border-neutral-200 dark:border-neutral-800 p-1 mb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
              tab === t
                ? "bg-brand dark:bg-brand-light text-cream dark:text-neutral-900"
                : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      {tab === "opportunities" && (
        <div className="flex flex-col gap-3">
          {opportunities.length === 0 && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Nothing published yet. Check back soon.
            </p>
          )}
          {opportunities.map((o) => (
            <div
              key={o.id}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 flex items-start justify-between gap-3"
            >
              <Link
                href={`/opportunity/${buildOpportunitySlug(o)}`}
                className="min-w-0 hover:underline flex items-start gap-3"
              >
                <CompanyLogo company={o.company} logoUrl={o.logo_url} size={32} />
                <div className="min-w-0">
                <p className="font-semibold">{o.role_title}</p>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  {o.company}
                </p>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  {REGION_LABELS[o.region]}
                  {o.city || o.country
                    ? ` · ${[o.city, o.country].filter(Boolean).join(", ")}`
                    : ""}{" "}
                  ·{" "}
                  {CATEGORY_LABELS[o.category]}
                </p>
                <div className="mt-1">
                  <DeadlineBadge deadline={o.deadline} />
                </div>
                </div>
              </Link>
              <button
                onClick={() => handleTrack(o.id)}
                disabled={isPending || tracked.has(o.id)}
                title={tracked.has(o.id) ? "Tracked" : "Track this opportunity"}
                className="shrink-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 disabled:opacity-100"
              >
                <BookmarkIcon filled={tracked.has(o.id)} />
              </button>
            </div>
          ))}
          <Link
            href="/opportunities"
            className="text-sm underline text-orange-600 dark:text-orange-400 mt-1"
          >
            View all opportunities
          </Link>
        </div>
      )}

      {tab === "events" && (
        <div className="flex flex-col gap-3">
          {events.length === 0 && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Nothing on the calendar yet. Check back soon.
            </p>
          )}
          {events.map((e) => (
            <div
              key={e.id}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4"
            >
              <p className="font-semibold">{e.title}</p>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {EVENT_TYPE_LABELS[e.event_type]} ·{" "}
                {new Date(e.event_date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
          <Link
            href="/events"
            className="text-sm underline text-orange-600 dark:text-orange-400 mt-1"
          >
            View all events
          </Link>
        </div>
      )}

      {tab === "resources" && (
        <div className="flex flex-col gap-3">
          {resources.length === 0 && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Nothing published yet. Check back soon.
            </p>
          )}
          {resources.map((r) => (
            <div
              key={r.id}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4"
            >
              <p className="font-semibold">{r.title}</p>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {RESOURCE_TYPE_LABELS[r.resource_type]} ·{" "}
                {r.is_paid ? r.price_label || "Paid" : "Free"}
              </p>
            </div>
          ))}
          <Link
            href="/interview-prep"
            className="text-sm underline text-orange-600 dark:text-orange-400 mt-1"
          >
            View all resources
          </Link>
        </div>
      )}
    </section>
  );
}
