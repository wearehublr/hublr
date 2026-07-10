"use client";

import { useState, useTransition } from "react";
import type { HublrEvent } from "@/types/event";
import {
  EVENT_TYPES,
  EVENT_TYPE_LABELS,
  LOCATION_TYPES,
  LOCATION_TYPE_LABELS,
} from "@/types/event";
import { updateEvent, deleteEvent, toggleEventPublish } from "./actions";

function toLocalInputValue(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AdminEventRow({ event }: { event: HublrEvent }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleUpdate(formData: FormData) {
    startTransition(async () => {
      await updateEvent(event.id, formData);
      setEditing(false);
    });
  }

  function handleDelete() {
    if (!confirm(`Delete "${event.title}"?`)) return;
    startTransition(() => deleteEvent(event.id));
  }

  function handleTogglePublish() {
    startTransition(() => toggleEventPublish(event.id, !event.is_published));
  }

  if (editing) {
    return (
      <form
        action={handleUpdate}
        className="rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        <input
          name="title"
          defaultValue={event.title}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm sm:col-span-2"
        />
        <select
          name="event_type"
          defaultValue={event.event_type}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {EVENT_TYPE_LABELS[t]}
            </option>
          ))}
        </select>
        <select
          name="location_type"
          defaultValue={event.location_type}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          {LOCATION_TYPES.map((l) => (
            <option key={l} value={l}>
              {LOCATION_TYPE_LABELS[l]}
            </option>
          ))}
        </select>

        <input
          name="event_date"
          type="datetime-local"
          defaultValue={toLocalInputValue(event.event_date)}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <input
          name="location"
          defaultValue={event.location ?? ""}
          placeholder="Location"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <input
          name="registration_url"
          defaultValue={event.registration_url ?? ""}
          placeholder="Registration URL"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm sm:col-span-2"
        />
        <input
          name="source_url"
          defaultValue={event.source_url ?? ""}
          placeholder="Source URL"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />

        <textarea
          name="description"
          defaultValue={event.description ?? ""}
          rows={1}
          placeholder="Description"
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
        <p className="font-medium truncate">{event.title}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {EVENT_TYPE_LABELS[event.event_type]} ·{" "}
          {LOCATION_TYPE_LABELS[event.location_type]}
          {event.location ? ` (${event.location})` : ""} ·{" "}
          {new Date(event.event_date).toLocaleString("en-GB")}
          {!event.is_published ? " · UNPUBLISHED" : ""}
        </p>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={handleTogglePublish}
          disabled={pending}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 text-xs font-medium px-2.5 py-1.5 disabled:opacity-50"
        >
          {event.is_published ? "Unpublish" : "Publish"}
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
