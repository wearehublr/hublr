"use client";

import { useTransition } from "react";
import type { ContactSubmission } from "@/types/contact-submission";
import { SUBMISSION_TYPE_LABELS } from "@/types/contact-submission";
import { deleteSubmission } from "./actions";

export default function SubmissionRow({
  submission,
}: {
  submission: ContactSubmission;
}) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete submission from "${submission.name}"?`)) return;
    startTransition(() => deleteSubmission(submission.id));
  }

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 flex flex-col sm:flex-row sm:items-start gap-3">
      <div className="flex-1 min-w-0">
        <p className="font-medium">
          {submission.name}{" "}
          <span className="font-normal text-neutral-500 dark:text-neutral-400">
            &lt;{submission.email}&gt;
          </span>
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {SUBMISSION_TYPE_LABELS[submission.submission_type]} ·{" "}
          {new Date(submission.created_at).toLocaleString("en-GB")}
        </p>
        {submission.message && (
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            {submission.message}
          </p>
        )}
      </div>

      <button
        onClick={handleDelete}
        disabled={pending}
        className="shrink-0 rounded-md border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-medium px-2.5 py-1.5 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
