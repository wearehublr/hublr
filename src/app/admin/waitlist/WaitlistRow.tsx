"use client";

import { useTransition } from "react";
import type { WaitlistSignup } from "@/types/waitlist-signup";
import { deleteWaitlistSignup } from "./actions";

export default function WaitlistRow({ signup }: { signup: WaitlistSignup }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Remove "${signup.email}" from the waitlist?`)) return;
    startTransition(() => deleteWaitlistSignup(signup.id));
  }

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">
          {signup.name || "(no name)"}{" "}
          <span className="font-normal text-neutral-500 dark:text-neutral-400">
            &lt;{signup.email}&gt;
          </span>
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Joined {new Date(signup.created_at).toLocaleString("en-GB")}
          {signup.notified_at
            ? ` · Notified ${new Date(signup.notified_at).toLocaleString("en-GB")}`
            : " · Not yet notified"}
        </p>
      </div>

      <button
        onClick={handleDelete}
        disabled={pending}
        className="shrink-0 rounded-md border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-medium px-2.5 py-1.5 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
