"use client";

import { useState, useTransition } from "react";
import type { InterviewResource } from "@/types/interview-resource";
import { RESOURCE_TYPES, RESOURCE_TYPE_LABELS } from "@/types/interview-resource";
import {
  updateResource,
  deleteResource,
  toggleResourcePublish,
} from "./actions";

export default function AdminResourceRow({
  resource,
}: {
  resource: InterviewResource;
}) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleUpdate(formData: FormData) {
    startTransition(async () => {
      await updateResource(resource.id, formData);
      setEditing(false);
    });
  }

  function handleDelete() {
    if (!confirm(`Delete "${resource.title}"?`)) return;
    startTransition(() => deleteResource(resource.id));
  }

  function handleTogglePublish() {
    startTransition(() =>
      toggleResourcePublish(resource.id, !resource.is_published),
    );
  }

  if (editing) {
    return (
      <form
        action={handleUpdate}
        className="rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        <input
          name="title"
          defaultValue={resource.title}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm sm:col-span-2"
        />
        <select
          name="resource_type"
          defaultValue={resource.resource_type}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          {RESOURCE_TYPES.map((t) => (
            <option key={t} value={t}>
              {RESOURCE_TYPE_LABELS[t]}
            </option>
          ))}
        </select>
        <input
          name="link_url"
          defaultValue={resource.link_url}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_paid"
            defaultChecked={resource.is_paid}
            className="h-4 w-4"
          />
          Paid
        </label>
        <input
          name="price_label"
          defaultValue={resource.price_label ?? ""}
          placeholder="Price label"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm sm:col-span-2 lg:col-span-3"
        />

        <textarea
          name="description"
          defaultValue={resource.description ?? ""}
          rows={1}
          placeholder="Description"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm col-span-full"
        />

        <div className="col-span-full flex gap-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium px-3 py-1.5 disabled:opacity-50"
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
        <p className="font-medium truncate">{resource.title}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {RESOURCE_TYPE_LABELS[resource.resource_type]} ·{" "}
          {resource.is_paid ? resource.price_label || "Paid" : "Free"}
          {!resource.is_published ? " · UNPUBLISHED" : ""}
        </p>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={handleTogglePublish}
          disabled={pending}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 text-xs font-medium px-2.5 py-1.5 disabled:opacity-50"
        >
          {resource.is_published ? "Unpublish" : "Publish"}
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
