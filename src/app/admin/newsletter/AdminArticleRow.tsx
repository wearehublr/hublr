"use client";

import { useState, useTransition } from "react";
import type { NewsletterArticle } from "@/types/newsletter-article";
import { updateArticle, deleteArticle, toggleArticlePublish } from "./actions";

export default function AdminArticleRow({
  article,
}: {
  article: NewsletterArticle;
}) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleUpdate(formData: FormData) {
    startTransition(async () => {
      await updateArticle(article.id, formData);
      setEditing(false);
    });
  }

  function handleDelete() {
    if (!confirm(`Delete "${article.title}"?`)) return;
    startTransition(() => deleteArticle(article.id));
  }

  function handleTogglePublish() {
    startTransition(() =>
      toggleArticlePublish(article.id, !article.is_published),
    );
  }

  if (editing) {
    return (
      <form
        action={handleUpdate}
        className="rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        <input
          name="title"
          defaultValue={article.title}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm col-span-full"
        />
        <input
          name="link_url"
          defaultValue={article.link_url}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <input
          name="published_date"
          type="date"
          defaultValue={article.published_date ?? ""}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <textarea
          name="description"
          defaultValue={article.description ?? ""}
          rows={2}
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
          {article.title}
          {!article.is_published ? " · UNPUBLISHED" : ""}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {article.published_date ?? "No date"} · {article.link_url}
        </p>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={handleTogglePublish}
          disabled={pending}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 text-xs font-medium px-2.5 py-1.5 disabled:opacity-50"
        >
          {article.is_published ? "Unpublish" : "Publish"}
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
