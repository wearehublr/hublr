"use client";

import { useState, useTransition } from "react";
import type { Application } from "@/types/application";
import { STAGES, STAGE_LABELS, type Stage } from "@/types/application";
import type { Document } from "@/types/document";
import DeadlineBadge from "@/app/components/DeadlineBadge";
import {
  updateApplication,
  updateApplicationStage,
  deleteApplication,
} from "./actions";

export default function ApplicationCard({
  application,
  documents,
}: {
  application: Application;
  documents: Document[];
}) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleStageChange(stage: Stage) {
    startTransition(() => updateApplicationStage(application.id, stage));
  }

  function handleUpdate(formData: FormData) {
    startTransition(async () => {
      await updateApplication(application.id, formData);
      setEditing(false);
    });
  }

  function handleDelete() {
    if (!confirm(`Stop tracking "${application.company} · ${application.role_title}"?`))
      return;
    startTransition(() => deleteApplication(application.id));
  }

  if (editing) {
    return (
      <form
        action={handleUpdate}
        className="rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        <input
          name="company"
          defaultValue={application.company}
          placeholder="Company"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <input
          name="role_title"
          defaultValue={application.role_title}
          placeholder="Role"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <input
          name="apply_url"
          defaultValue={application.apply_url ?? ""}
          placeholder="Apply URL"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm sm:col-span-2"
        />
        <input
          name="deadline"
          type="date"
          defaultValue={application.deadline ?? ""}
          title="Deadline"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <input
          name="applied_date"
          type="date"
          defaultValue={application.applied_date ?? ""}
          title="Applied on"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />

        <select
          name="cv_document_id"
          defaultValue={application.cv_document_id ?? ""}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          <option value="">No CV attached</option>
          {documents
            .filter((d) => d.doc_type === "cv")
            .map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
        </select>
        <select
          name="cover_letter_document_id"
          defaultValue={application.cover_letter_document_id ?? ""}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          <option value="">No cover letter attached</option>
          {documents
            .filter((d) => d.doc_type === "cover_letter")
            .map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
        </select>

        <textarea
          name="notes"
          defaultValue={application.notes ?? ""}
          placeholder="Notes"
          rows={2}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm sm:col-span-2"
        />

        <div className="sm:col-span-2 flex gap-2">
          <button
            type="submit"
            disabled={isPending}
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

  const cv = documents.find((d) => d.id === application.cv_document_id);
  const coverLetter = documents.find(
    (d) => d.id === application.cover_letter_document_id,
  );

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-medium truncate">{application.company}</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 truncate">
            {application.role_title}
          </p>
        </div>
        <select
          value={application.stage}
          onChange={(e) => handleStageChange(e.target.value as Stage)}
          disabled={isPending}
          className="shrink-0 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-2 py-1 text-xs"
        >
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {STAGE_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <DeadlineBadge deadline={application.deadline} />

      {(cv || coverLetter) && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {cv ? `CV: ${cv.label}` : "No CV attached"}
          {" · "}
          {coverLetter ? `Cover letter: ${coverLetter.label}` : "No cover letter"}
        </p>
      )}

      {application.notes && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {application.notes}
        </p>
      )}

      <div className="mt-1 flex gap-2">
        {application.apply_url && (
          <a
            href={application.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline text-neutral-500 dark:text-neutral-400"
          >
            View posting
          </a>
        )}
        <button
          onClick={() => setEditing(true)}
          className="text-xs underline text-neutral-500 dark:text-neutral-400 ml-auto"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-xs underline text-red-600 dark:text-red-400 disabled:opacity-50"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
