"use client";

import { useState, useTransition } from "react";
import type { Testimonial } from "@/types/testimonial";
import {
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialPublish,
} from "./actions";

export default function AdminTestimonialRow({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleUpdate(formData: FormData) {
    startTransition(async () => {
      await updateTestimonial(testimonial.id, formData);
      setEditing(false);
    });
  }

  function handleDelete() {
    if (!confirm(`Delete testimonial from "${testimonial.name}"?`)) return;
    startTransition(() => deleteTestimonial(testimonial.id));
  }

  function handleTogglePublish() {
    startTransition(() =>
      toggleTestimonialPublish(testimonial.id, !testimonial.is_published),
    );
  }

  if (editing) {
    return (
      <form
        action={handleUpdate}
        className="rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        <input
          name="name"
          defaultValue={testimonial.name}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <input
          name="subtitle"
          defaultValue={testimonial.subtitle ?? ""}
          placeholder="Subtitle"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <input
          name="photo_url"
          defaultValue={testimonial.photo_url ?? ""}
          placeholder="Photo URL"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm col-span-full"
        />
        <textarea
          name="story"
          defaultValue={testimonial.story}
          rows={3}
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
          {testimonial.name}
          {!testimonial.is_published ? " · UNPUBLISHED" : ""}
        </p>
        {testimonial.subtitle && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {testimonial.subtitle}
          </p>
        )}
        <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
          {testimonial.story}
        </p>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={handleTogglePublish}
          disabled={pending}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 text-xs font-medium px-2.5 py-1.5 disabled:opacity-50"
        >
          {testimonial.is_published ? "Unpublish" : "Publish"}
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
