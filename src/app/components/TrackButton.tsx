"use client";

import { useState, useTransition } from "react";
import { trackApplication } from "@/app/opportunities/actions";

export default function TrackButton({
  opportunityId,
  isLoggedIn,
}: {
  opportunityId: string;
  isLoggedIn: boolean;
}) {
  const [tracked, setTracked] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!isLoggedIn) {
    return (
      <a
        href="/login"
        className="flex-1 inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-1.5"
      >
        Log in to track
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        startTransition(async () => {
          await trackApplication(opportunityId);
          setTracked(true);
        })
      }
      disabled={isPending || tracked}
      className="flex-1 inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-1.5 disabled:opacity-60"
    >
      {tracked ? "Tracked ✓" : "Track"}
    </button>
  );
}
