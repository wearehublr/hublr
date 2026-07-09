"use client";

import { useActionState } from "react";
import { updatePassword } from "./actions";

export default function UpdatePasswordForm() {
  const [state, formAction, pending] = useActionState(updatePassword, {
    error: null,
  });

  return (
    <form
      action={formAction}
      className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6"
    >
      <div>
        <h1 className="text-lg font-semibold">Set a new password</h1>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        New password
        <input
          type="password"
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400"
        />
      </label>

      {state?.error && (
        <p className="text-sm text-red-600 dark:text-red-400" aria-live="polite">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium px-3 py-2 hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save new password"}
      </button>
    </form>
  );
}
