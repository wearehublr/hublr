"use client";

import { useActionState } from "react";
import { joinWaitlist } from "./actions";
import Turnstile from "@/app/components/Turnstile";

const initialState = { error: null, success: false };

export default function WaitlistForm() {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState);

  if (state.success) {
    return (
      <div className="rounded-lg border border-brand/20 dark:border-brand-light/20 bg-white/60 dark:bg-neutral-900/40 p-6 text-left">
        <p className="text-sm font-semibold">You&apos;re on the list 🎉</p>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          We&apos;ll email you the moment Hublr goes live so you can start
          browsing straight away.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-3 rounded-lg border border-brand/20 dark:border-brand-light/20 bg-white/60 dark:bg-neutral-900/40 p-6 text-left"
    >
      <label className="flex flex-col gap-1 text-sm">
        Name (optional)
        <input
          type="text"
          name="name"
          autoComplete="name"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400"
        />
      </label>

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

      <Turnstile />

      {state?.error && (
        <p className="text-sm text-red-600 dark:text-red-400" aria-live="polite">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 rounded-full bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-semibold px-6 py-3 hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Joining..." : "Join the waitlist"}
      </button>
    </form>
  );
}
