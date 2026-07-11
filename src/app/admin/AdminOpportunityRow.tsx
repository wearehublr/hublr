"use client";

import { useState, useTransition } from "react";
import type { Opportunity } from "@/types/opportunity";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  REGIONS,
  REGION_LABELS,
  STATUSES,
  STATUS_LABELS,
} from "@/types/opportunity";
import { updateOpportunity, deleteOpportunity, togglePublish } from "./actions";

export default function AdminOpportunityRow({
  opportunity,
}: {
  opportunity: Opportunity;
}) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleUpdate(formData: FormData) {
    startTransition(async () => {
      await updateOpportunity(opportunity.id, formData);
      setEditing(false);
    });
  }

  function handleDelete() {
    if (!confirm(`Delete "${opportunity.company} · ${opportunity.role_title}"?`))
      return;
    startTransition(() => deleteOpportunity(opportunity.id));
  }

  function handleTogglePublish() {
    startTransition(() =>
      togglePublish(opportunity.id, !opportunity.is_published),
    );
  }

  if (editing) {
    return (
      <form
        action={handleUpdate}
        className="rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        <input
          name="company"
          defaultValue={opportunity.company}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <input
          name="role_title"
          defaultValue={opportunity.role_title}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <select
          name="category"
          defaultValue={opportunity.category}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
        <select
          name="region"
          defaultValue={opportunity.region}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {REGION_LABELS[r]}
            </option>
          ))}
        </select>

        <input
          name="apply_url"
          defaultValue={opportunity.apply_url}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm sm:col-span-2"
        />
        <input
          name="country"
          defaultValue={opportunity.country ?? ""}
          placeholder="Country"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <input
          name="city"
          defaultValue={opportunity.city ?? ""}
          placeholder="City"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <input
          name="industry"
          defaultValue={opportunity.industry ?? ""}
          placeholder="Industry"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />

        <select
          name="status"
          defaultValue={opportunity.status}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <input
          name="deadline"
          type="date"
          defaultValue={opportunity.deadline ?? ""}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <input
          name="open_date"
          type="date"
          defaultValue={opportunity.open_date ?? ""}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <input
          name="source_url"
          defaultValue={opportunity.source_url ?? ""}
          placeholder="Source URL"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />

        <textarea
          name="notes"
          defaultValue={opportunity.notes ?? ""}
          rows={1}
          placeholder="Notes"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm col-span-full"
        />

        <div className="col-span-full flex gap-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-3 py-1.5 disabled:opacity-50"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-1.5"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">
          {opportunity.company} · {opportunity.role_title}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {CATEGORY_LABELS[opportunity.category]} · {REGION_LABELS[opportunity.region]}
          {opportunity.city || opportunity.country
            ? ` (${[opportunity.city, opportunity.country].filter(Boolean).join(", ")})`
            : ""}{" "}
          ·{" "}
          {STATUS_LABELS[opportunity.status]}
          {opportunity.deadline ? ` · Deadline ${opportunity.deadline}` : ""}
          {!opportunity.is_published ? " · UNPUBLISHED" : ""}
        </p>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={handleTogglePublish}
          disabled={pending}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 text-xs font-medium px-2.5 py-1.5 disabled:opacity-50"
        >
          {opportunity.is_published ? "Unpublish" : "Publish"}
        </button>
        <button
          onClick={() => setEditing(true)}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 text-xs font-medium px-2.5 py-1.5"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={pending}
          className="rounded-md border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-medium px-2.5 py-1.5 disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
