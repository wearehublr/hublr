"use client";

import { useActionState } from "react";
import { submitContactForm } from "./actions";
import { SUBMISSION_TYPES, SUBMISSION_TYPE_LABELS } from "@/types/contact-submission";

const initialState = { error: null, success: false };

export default function WorkWithUsForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  if (state.success) {
    return (
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
        <h2 className="text-lg font-semibold">Thanks for reaching out</h2>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          We&apos;ve got your message and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6"
    >
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium mb-1">I am a...</legend>
        {SUBMISSION_TYPES.map((type) => (
          <label key={type} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="submission_type"
              value={type}
              required
              className="h-4 w-4"
            />
            {SUBMISSION_TYPE_LABELS[type]}
          </label>
        ))}
      </fieldset>

      <label className="flex flex-col gap-1 text-sm">
        Name
        <input
          type="text"
          name="name"
          required
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Email
        <input
          type="email"
          name="email"
          required
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Message (optional)
        <textarea
          name="message"
          rows={4}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400"
        />
      </label>

      {state?.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-4 py-2 hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
