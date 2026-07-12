"use client";

import { useEffect, useRef, useState } from "react";
import {
  ensureApplicationSaved,
  markApplicationOutcome,
} from "@/app/opportunities/actions";
import type { ApplyClickInfo } from "@/lib/apply-tracking";

export default function ApplyConfirmationProvider() {
  const awaitingRef = useRef<ApplyClickInfo | null>(null);
  const [pending, setPending] = useState<ApplyClickInfo | null>(null);
  const [showReasonBox, setShowReasonBox] = useState(false);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    function onApplyClick(e: Event) {
      const detail = (e as CustomEvent<ApplyClickInfo>).detail;
      awaitingRef.current = detail;
      ensureApplicationSaved(detail.id).catch(() => {});
    }

    function onVisibilityChange() {
      if (document.visibilityState === "visible" && awaitingRef.current) {
        setPending(awaitingRef.current);
        awaitingRef.current = null;
      }
    }

    window.addEventListener("hublr:apply-click", onApplyClick);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("hublr:apply-click", onApplyClick);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  function close() {
    setPending(null);
    setShowReasonBox(false);
    setReason("");
  }

  async function handleYes() {
    if (!pending) return;
    setSubmitting(true);
    await markApplicationOutcome(pending.id, { applied: true });
    setSubmitting(false);
    close();
  }

  async function handleNoSubmit() {
    if (!pending) return;
    setSubmitting(true);
    await markApplicationOutcome(pending.id, {
      applied: false,
      reason: reason.trim() || null,
    });
    setSubmitting(false);
    close();
  }

  if (!pending) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white dark:bg-neutral-900 p-5 shadow-xl">
        <p className="font-semibold">Did you apply?</p>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          {pending.company} · {pending.role_title}
        </p>

        {!showReasonBox ? (
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleYes}
              disabled={submitting}
              className="flex-1 rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-3 py-1.5 disabled:opacity-50"
            >
              Yes
            </button>
            <button
              onClick={() => setShowReasonBox(true)}
              disabled={submitting}
              className="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-1.5 disabled:opacity-50"
            >
              No
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why not? (optional)"
              rows={2}
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={handleNoSubmit}
                disabled={submitting}
                className="flex-1 rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-3 py-1.5 disabled:opacity-50"
              >
                Submit
              </button>
              <button
                onClick={close}
                disabled={submitting}
                className="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-1.5 disabled:opacity-50"
              >
                Skip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
