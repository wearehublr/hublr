"use client";

import { useState, useTransition } from "react";
import { notifyWaitlist } from "./actions";

export default function NotifyButton({ pendingCount }: { pendingCount: number }) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<number | null>(null);

  function handleClick() {
    if (
      !confirm(
        `Send the "we're live" email to ${pendingCount} not-yet-notified signup${pendingCount === 1 ? "" : "s"}? This can't be undone.`,
      )
    )
      return;

    startTransition(async () => {
      const { sent } = await notifyWaitlist();
      setResult(sent);
    });
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleClick}
        disabled={isPending || pendingCount === 0}
        className="rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-4 py-2 hover:opacity-90 disabled:opacity-50"
      >
        {isPending
          ? "Sending..."
          : `Notify everyone — we're live! (${pendingCount})`}
      </button>
      {result !== null && (
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Sent to {result} {result === 1 ? "person" : "people"}.
        </p>
      )}
    </div>
  );
}
