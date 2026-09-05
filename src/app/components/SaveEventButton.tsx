"use client";

import { useState, useTransition } from "react";
import { saveEvent } from "@/app/events/actions";

export default function SaveEventButton({
  eventId,
  isLoggedIn,
}: {
  eventId: string;
  isLoggedIn: boolean;
}) {
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!isLoggedIn) {
    return (
      <a
        href="/login?next=/events"
        className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-1.5"
      >
        Log in to save
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        startTransition(async () => {
          await saveEvent(eventId);
          setSaved(true);
        })
      }
      disabled={isPending || saved}
      className="inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-1.5 disabled:opacity-60"
    >
      {saved ? "Saved ✓" : "Save"}
    </button>
  );
}
