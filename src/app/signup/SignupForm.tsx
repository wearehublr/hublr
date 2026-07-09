"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUp } from "./actions";

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(signUp, {
    error: null,
    success: false,
  });

  if (state.success) {
    return (
      <div className="flex w-full max-w-sm flex-col gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
        <h1 className="text-lg font-semibold">Check your email</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          We sent you a confirmation link. Click it to finish creating your
          account, then log in.
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
        <h1 className="text-lg font-semibold">Create your account</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Track applications, deadlines, and documents in one place.
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

      <label className="flex flex-col gap-1 text-sm">
        Password
        <input
          type="password"
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400"
        />
        <span className="text-xs text-neutral-400">At least 8 characters.</span>
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
        {pending ? "Creating account..." : "Sign up"}
      </button>

      <Link href="/login" className="text-sm underline text-center">
        Already have an account? Log in
      </Link>
    </form>
  );
}
