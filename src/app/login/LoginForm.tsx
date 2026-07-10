"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, {
    error: null,
  });

  return (
    <form
      action={formAction}
      className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6"
    >
      <div>
        <h1 className="text-lg font-semibold">Log in</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Hublr: helping you secure internships, grad roles, and more.
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
          autoComplete="current-password"
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
        {pending ? "Signing in..." : "Log in"}
      </button>

      <div className="flex justify-between text-sm">
        <Link href="/signup" className="underline">
          Create account
        </Link>
        <Link href="/reset-password" className="underline">
          Forgot password?
        </Link>
      </div>
    </form>
  );
}
