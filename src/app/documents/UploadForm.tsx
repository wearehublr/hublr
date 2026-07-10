"use client";

import { useActionState, useRef } from "react";
import { uploadDocument } from "./actions";
import { DOC_TYPES, DOC_TYPE_LABELS } from "@/types/document";

const initialState = { error: null };

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    async (prevState: { error: string | null }, formData: FormData) => {
      const result = await uploadDocument(prevState, formData);
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
        Upload a CV or cover letter
      </h2>

      <input
        name="label"
        placeholder="Label, e.g. 'CV - Tech v2' *"
        required
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm sm:col-span-2"
      />

      <select
        name="doc_type"
        defaultValue="cv"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      >
        {DOC_TYPES.map((t) => (
          <option key={t} value={t}>
            {DOC_TYPE_LABELS[t]}
          </option>
        ))}
      </select>

      <input
        name="file"
        type="file"
        required
        accept=".pdf,.doc,.docx"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm file:mr-2 file:rounded file:border-0 file:bg-neutral-200 dark:file:bg-neutral-700 file:px-2 file:py-1 file:text-xs"
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
        {pending ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
