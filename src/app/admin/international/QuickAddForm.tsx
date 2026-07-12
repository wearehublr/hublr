"use client";

import { useActionState, useRef } from "react";
import { addResource } from "./actions";
import { INTL_RESOURCE_TYPES, INTL_RESOURCE_TYPE_LABELS } from "@/types/international-resource";

const initialState = { error: null };

export default function QuickAddForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    async (prevState: { error: string | null }, formData: FormData) => {
      const result = await addResource(prevState, formData);
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
        Quick add international resource
      </h2>

      <input
        name="title"
        placeholder="Title *"
        required
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm sm:col-span-2"
      />
      <select
        name="resource_type"
        required
        defaultValue=""
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      >
        <option value="" disabled>
          Type *
        </option>
        {INTL_RESOURCE_TYPES.map((t) => (
          <option key={t} value={t}>
            {INTL_RESOURCE_TYPE_LABELS[t]}
          </option>
        ))}
      </select>
      <input
        name="link_url"
        placeholder="Link URL *"
        required
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_paid" className="h-4 w-4" />
        Paid
      </label>
      <input
        name="price_label"
        placeholder="Price label (e.g. £9)"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm sm:col-span-2 lg:col-span-3"
      />

      <textarea
        name="description"
        placeholder="Description (optional)"
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
        {pending ? "Adding..." : "Add resource"}
      </button>
    </form>
  );
}
