"use client";

import { useActionState, useRef } from "react";
import { addApplication } from "./actions";

const initialState = { error: null };

export default function AddApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    async (prevState: { error: string | null }, formData: FormData) => {
      const result = await addApplication(prevState, formData);
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
      <h2 className="col-span-full text-sm font-semibold">
        Track an application manually
      </h2>

      <input
        name="company"
        placeholder="Company *"
        required
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      />
      <input
        name="role_title"
        placeholder="Role *"
        required
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      />
      <input
        name="apply_url"
        type="url"
        placeholder="Apply URL (optional)"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm sm:col-span-2 lg:col-span-2"
      />

      <input
        name="cycle_year"
        type="number"
        placeholder="Cycle year (optional)"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      />
      <input
        name="deadline"
        type="date"
        title="Deadline (optional)"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      />
      <input
        name="applied_date"
        type="date"
        title="Applied on (optional)"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      />

      <textarea
        name="notes"
        placeholder="Notes (optional)"
        rows={1}
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
        {pending ? "Adding..." : "Add application"}
      </button>
    </form>
  );
}
