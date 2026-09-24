"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const DISMISSED_UNTIL_KEY = "hublr_profile_nudge_dismissed_until";
const SNOOZE_DAYS = 3;

export default function CompleteProfileNudge() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissedUntil = localStorage.getItem(DISMISSED_UNTIL_KEY);
      if (!dismissedUntil || Date.now() > Number(dismissedUntil)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function remindLater() {
    try {
      const until = Date.now() + SNOOZE_DAYS * 24 * 60 * 60 * 1000;
      localStorage.setItem(DISMISSED_UNTIL_KEY, String(until));
    } catch {
      // localStorage unavailable - the nudge will just show again next visit
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Complete your profile"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="w-full max-w-sm rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6">
        <h2 className="text-base font-semibold mb-2">Finish setting up your profile</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6">
          Add your name, university, degree, graduation year and student status
          so we can match you with the right opportunities and reminders.
        </p>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={remindLater}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm font-medium"
          >
            Remind me later
          </button>
          <Link
            href="/profile"
            className="rounded-md bg-brand dark:bg-brand-light px-4 py-2 text-sm font-medium text-cream dark:text-neutral-900"
          >
            Complete profile
          </Link>
        </div>
      </div>
    </div>
  );
}
