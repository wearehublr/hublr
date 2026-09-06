"use client";

import { useMemo, useState } from "react";
import type { NewsletterArticle } from "@/types/newsletter-article";
import { NEWSLETTER_TOPICS, NEWSLETTER_TOPIC_LABELS } from "@/types/newsletter-article";

export default function NewsletterBrowser({
  articles,
}: {
  articles: NewsletterArticle[];
}) {
  const [topic, setTopic] = useState<"all" | (typeof NEWSLETTER_TOPICS)[number]>("all");

  const filtered = useMemo(() => {
    if (topic === "all") return articles;
    return articles.filter((a) => (a.topic ?? "general") === topic);
  }, [articles, topic]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-2">What are you looking for?</p>
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
          {NEWSLETTER_TOPICS.map((t) => (
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
              {NEWSLETTER_TOPIC_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 py-12 text-center">
          Nothing tagged for this yet. Check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <a
              key={a.id}
              href={a.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-neutral-200 dark:border-neutral-800 p-4"
            >
              <span className="block h-1 w-10 bg-brand-light dark:bg-brand mb-3" />
              <h2 className="font-semibold group-hover:underline">
                {a.title}
              </h2>
              {a.description && (
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {a.description}
                </p>
              )}
              {a.published_date && (
                <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
                  {new Date(a.published_date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
