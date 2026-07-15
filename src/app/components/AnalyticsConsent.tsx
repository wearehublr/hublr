"use client";

import { useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const CONSENT_KEY = "hublr_cookie_consent";

type Consent = "accepted" | "declined" | "unset";

let listeners: Array<() => void> = [];

function subscribe(callback: () => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function getSnapshot(): Consent {
  const stored = localStorage.getItem(CONSENT_KEY);
  return stored === "accepted" || stored === "declined" ? stored : "unset";
}

function getServerSnapshot(): Consent {
  return "unset";
}

function setConsent(value: "accepted" | "declined") {
  localStorage.setItem(CONSENT_KEY, value);
  listeners.forEach((listener) => listener());
}

export default function AnalyticsConsent({ gaId }: { gaId: string }) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics gaId={gaId} />}

      {consent === "unset" && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-4 sm:px-6"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="flex-1 text-sm text-neutral-600 dark:text-neutral-300">
              We use Google Analytics to understand how the site is used.
              See our{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              .
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConsent("declined")}
                className="rounded-md border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm font-medium"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => setConsent("accepted")}
                className="rounded-md bg-brand dark:bg-brand-light px-4 py-2 text-sm font-medium text-cream dark:text-neutral-900"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
