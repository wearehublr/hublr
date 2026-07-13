"use client";

import { useActionState, useState } from "react";
import { deleteAccount } from "./actions";

const initialState = { error: null };

export default function DeleteAccountSection() {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [state, formAction, pending] = useActionState(deleteAccount, initialState);

  return (
    <div className="mt-12 rounded-lg border border-red-300 dark:border-red-800 p-4">
      <h2 className="text-sm font-semibold text-red-700 dark:text-red-400">
        Danger zone
      </h2>

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-3 rounded-md border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium px-3 py-1.5"
        >
          Delete my account
        </button>
      ) : (
        <form action={formAction} className="mt-3 flex flex-col gap-3">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            This permanently deletes your profile, tracked applications,
            uploaded documents, and job alerts. This cannot be undone. Type{" "}
            <strong>DELETE</strong> below to confirm.
          </p>
          <input
            name="confirmation"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder="Type DELETE to confirm"
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm max-w-xs"
          />
          {state?.error && (
            <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={pending || confirmation !== "DELETE"}
              className="rounded-md bg-red-600 text-white text-sm font-medium px-4 py-2 hover:opacity-90 disabled:opacity-50"
            >
              {pending ? "Deleting..." : "Permanently delete my account"}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setConfirmation("");
              }}
              disabled={pending}
              className="rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
