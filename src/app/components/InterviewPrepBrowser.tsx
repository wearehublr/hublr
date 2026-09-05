"use client";

import { useMemo, useState } from "react";
import type { InterviewResource } from "@/types/interview-resource";
import { RESOURCE_TYPE_LABELS, INTERVIEW_TOPICS, INTERVIEW_TOPIC_LABELS } from "@/types/interview-resource";

export default function InterviewPrepBrowser({
  resources,
}: {
  resources: InterviewResource[];
}) {
  const [topic, setTopic] = useState<"all" | (typeof INTERVIEW_TOPICS)[number]>("all");

  const filtered = useMemo(() => {
    if (topic === "all") return resources;
    return resources.filter((r) => (r.topic ?? "general") === topic);
  }, [resources, topic]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-2">What are you preparing for?</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTopic("all")}
            className={`text-sm rounded-full border px-3 py-1.5 ${
              topic === "all"
                ? "bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 border-transparent"
                : "border-neutral-300 dark:border-neutral-700"
            }`}
          >
            All
          </button>
          {INTERVIEW_TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className={`text-sm rounded-full border px-3 py-1.5 ${
                topic === t
                  ? "bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 border-transparent"
                  : "border-neutral-300 dark:border-neutral-700"
              }`}
            >
              {INTERVIEW_TOPIC_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 py-12 text-center">
          Nothing tagged for this yet. Check back soon.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((r) => (
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
                {RESOURCE_TYPE_LABELS[r.resource_type]}
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
    </div>
  );
}
