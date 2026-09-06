"use client";

import { useState, useTransition } from "react";
import type { InterviewQuestion } from "@/types/interview-question";
import { INTERVIEW_TOPICS, INTERVIEW_TOPIC_LABELS } from "@/types/interview-resource";
import {
  updateQuestion,
  deleteQuestion,
  toggleQuestionPublish,
} from "./actions";

export default function AdminQuestionRow({
  question,
}: {
  question: InterviewQuestion;
}) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleUpdate(formData: FormData) {
    startTransition(async () => {
      await updateQuestion(question.id, formData);
      setEditing(false);
    });
  }

  function handleDelete() {
    if (!confirm(`Delete "${question.question}"?`)) return;
    startTransition(() => deleteQuestion(question.id));
  }

  function handleTogglePublish() {
    startTransition(() =>
      toggleQuestionPublish(question.id, !question.is_published),
    );
  }

  if (editing) {
    return (
      <form
        action={handleUpdate}
        className="rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        <input
          name="question"
          defaultValue={question.question}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm col-span-full"
        />

        <select
          name="topic"
          defaultValue={question.topic}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          {INTERVIEW_TOPICS.map((t) => (
            <option key={t} value={t}>
              {INTERVIEW_TOPIC_LABELS[t]}
            </option>
          ))}
        </select>
        <input
          name="source"
          defaultValue={question.source ?? ""}
          placeholder="Source"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />

        <input
          name="answer_1_label"
          defaultValue={question.answer_1_label ?? ""}
          placeholder="Sample answer 1 label"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm col-span-full"
        />
        <textarea
          name="answer_1"
          defaultValue={question.answer_1}
          rows={3}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm col-span-full"
        />

        <input
          name="answer_2_label"
          defaultValue={question.answer_2_label ?? ""}
          placeholder="Sample answer 2 label"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm col-span-full"
        />
        <textarea
          name="answer_2"
          defaultValue={question.answer_2 ?? ""}
          rows={3}
          placeholder="Sample answer 2 (optional)"
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
        <p className="font-medium truncate">{question.question}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {INTERVIEW_TOPIC_LABELS[question.topic]}
          {question.answer_2 ? " · 2 sample answers" : " · 1 sample answer"}
          {!question.is_published ? " · UNPUBLISHED" : ""}
        </p>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={handleTogglePublish}
          disabled={pending}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 text-xs font-medium px-2.5 py-1.5 disabled:opacity-50"
        >
          {question.is_published ? "Unpublish" : "Publish"}
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
