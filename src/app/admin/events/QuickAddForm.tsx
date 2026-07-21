"use client";

import { useActionState, useRef } from "react";
import { addEvent } from "./actions";
import {
  EVENT_TYPES,
  EVENT_TYPE_LABELS,
  LOCATION_TYPES,
  LOCATION_TYPE_LABELS,
} from "@/types/event";

const initialState = { error: null };

export default function QuickAddForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    async (prevState: { error: string | null }, formData: FormData) => {
      const result = await addEvent(prevState, formData);
      if (!result.error) formRef.current?.reset();
      return result;
    },
    initialState,
  );

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
    >
      <h2 className="col-span-full text-sm font-semibold">Quick add event</h2>

      <input
        name="title"
        placeholder="Title *"
        required
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm sm:col-span-2"
      />
      <input
        name="company"
        placeholder="Company (optional)"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      />
      <input
        name="logo_url"
        type="url"
        placeholder="Logo image URL (optional)"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      />
      <select
        name="event_type"
        required
        defaultValue=""
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      >
        <option value="" disabled>
          Type *
        </option>
        {EVENT_TYPES.map((t) => (
          <option key={t} value={t}>
            {EVENT_TYPE_LABELS[t]}
          </option>
        ))}
      </select>
      <select
        name="location_type"
        required
        defaultValue=""
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      >
        <option value="" disabled>
          Location type *
        </option>
        {LOCATION_TYPES.map((l) => (
          <option key={l} value={l}>
            {LOCATION_TYPE_LABELS[l]}
          </option>
        ))}
      </select>

      <input
        name="event_date"
        type="datetime-local"
        required
        title="Date & time *"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      />
      <input
        name="location"
        placeholder="Location (e.g. Online, London)"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      />
      <label className="flex flex-col gap-1 text-xs text-neutral-500 dark:text-neutral-400">
        Application deadline (optional)
        <input
          name="deadline"
          type="date"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100"
        />
      </label>
      <input
        name="registration_url"
        placeholder="Registration URL"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm sm:col-span-2"
      />
      <input
        name="source_url"
        placeholder="Source URL (optional)"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      />

      <textarea
        name="description"
        placeholder="Short description (optional, shown on cards)"
        rows={1}
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm col-span-full"
      />
      <textarea
        name="full_description"
        placeholder="Full event details (optional, shown on the event's own page)"
        rows={4}
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm col-span-full"
      />

      {state?.error && (
        <p className="col-span-full text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="col-span-full sm:col-span-1 rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-3 py-2 hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Adding..." : "Add event"}
      </button>
    </form>
  );
}
