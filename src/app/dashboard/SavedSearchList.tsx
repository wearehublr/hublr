"use client";

import { useTransition } from "react";
import type { SavedSearch } from "@/types/saved-search";
import { deleteSavedSearch } from "@/app/opportunities/saved-search-actions";

export default function SavedSearchList({
  savedSearches,
}: {
  savedSearches: SavedSearch[];
}) {
  const [pending, startTransition] = useTransition();

  if (savedSearches.length === 0) return null;

  function handleDelete(id: string) {
    startTransition(() => deleteSavedSearch(id));
  }

  return (
    <div>
      <h2 className="text-sm font-semibold mb-3">Job alerts</h2>
      <div className="flex flex-col gap-2">
        {savedSearches.map((s) => (
          <div
            key={s.id}
            className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 flex items-center justify-between gap-3"
          >
            <span className="text-sm">{s.label}</span>
            <button
              type="button"
              onClick={() => handleDelete(s.id)}
              disabled={pending}
              className="shrink-0 rounded-md border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-medium px-2.5 py-1.5 disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
