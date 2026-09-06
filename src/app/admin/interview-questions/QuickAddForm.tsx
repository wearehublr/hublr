"use client";

import { useActionState, useRef } from "react";
import { addQuestion } from "./actions";
import { INTERVIEW_TOPICS, INTERVIEW_TOPIC_LABELS } from "@/types/interview-resource";

const initialState = { error: null };

export default function QuickAddForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    async (prevState: { error: string | null }, formData: FormData) => {
      const result = await addQuestion(prevState, formData);
      if (!result.error) formRef.current?.reset();
      return result;
    },
    initialState,
  );

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
    >
      <h2 className="col-span-full text-sm font-semibold">
        Quick add interview question
      </h2>

      <input
        name="question"
        placeholder="Question *"
        required
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm col-span-full"
      />

      <select
        name="topic"
        required
        defaultValue=""
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      >
        <option value="" disabled>
          Topic *
        </option>
        {INTERVIEW_TOPICS.map((t) => (
          <option key={t} value={t}>
            {INTERVIEW_TOPIC_LABELS[t]}
          </option>
        ))}
      </select>
      <input
        name="source"
        placeholder="Source (e.g. guide name, optional)"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      />

      <input
        name="answer_1_label"
        placeholder="Sample answer 1 label (optional)"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm col-span-full"
      />
      <textarea
        name="answer_1"
        placeholder="Sample answer 1 *"
        required
        rows={3}
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm col-span-full"
      />

      <input
        name="answer_2_label"
        placeholder="Sample answer 2 label (optional)"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm col-span-full"
      />
      <textarea
        name="answer_2"
        placeholder="Sample answer 2 (optional)"
        rows={3}
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
        {pending ? "Adding..." : "Add question"}
      </button>
    </form>
  );
}
