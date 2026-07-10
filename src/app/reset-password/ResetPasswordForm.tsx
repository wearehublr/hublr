"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestPasswordReset } from "./actions";

export default function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordReset, {
    error: null,
    success: false,
  });

  if (state.success) {
    return (
      <div className="flex w-full max-w-sm flex-col gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
        <h1 className="text-lg font-semibold">Check your email</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          If an account exists for that address, we&apos;ve sent a link to
          reset your password.
        </p>
        <Link href="/login" className="text-sm underline mt-2">
          Back to log in
        </Link>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6"
    >
      <div>
        <h1 className="text-lg font-semibold">Reset your password</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          We&apos;ll email you a link to set a new one.
        </p>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        Email
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
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
        className="mt-2 rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-3 py-2 hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send reset link"}
      </button>

      <Link href="/login" className="text-sm underline text-center">
        Back to log in
      </Link>
    </form>
  );
}
