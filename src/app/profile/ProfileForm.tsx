"use client";

import { useActionState, useState } from "react";
import { updateProfile } from "./actions";
import type { Profile } from "@/types/profile";
import {
  STUDY_YEARS,
  STUDENT_STATUSES,
  STUDENT_STATUS_LABELS,
  INDUSTRIES,
  MAX_INTERESTED_INDUSTRIES,
} from "@/types/profile";

const initialState = { error: null };

export default function ProfileForm({ profile }: { profile: Profile | null }) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    profile?.interested_industries ?? [],
  );

  function toggleIndustry(industry: string) {
    setSelectedIndustries((prev) => {
      if (prev.includes(industry)) return prev.filter((i) => i !== industry);
      if (prev.length >= MAX_INTERESTED_INDUSTRIES) return prev;
      return [...prev, industry];
    });
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 max-w-xl"
    >
      <div>
        <label className="text-sm font-medium mb-1 block" htmlFor="preferred_name">
          Preferred name
        </label>
        <input
          id="preferred_name"
          name="preferred_name"
          defaultValue={profile?.preferred_name ?? ""}
          placeholder="What should we call you?"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm w-full"
        />
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          Used across the site and in emails from Hublr.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="university"
          defaultValue={profile?.university ?? ""}
          placeholder="University"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <input
          name="degree"
          defaultValue={profile?.degree ?? ""}
          placeholder="Degree"
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
        <select
          name="study_year"
          defaultValue={profile?.study_year ?? ""}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          <option value="">Year of study</option>
          {STUDY_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          name="student_status"
          defaultValue={profile?.student_status ?? ""}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          <option value="">Home / international status</option>
          {STUDENT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STUDENT_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <input
        name="goal"
        defaultValue={profile?.goal ?? ""}
        placeholder="Career goal (e.g. Investment Banking Analyst)"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      />

      <textarea
        name="summary"
        defaultValue={profile?.summary ?? ""}
        rows={4}
        placeholder="Profile summary"
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
      />

      <div>
        <p className="text-sm font-medium mb-2">
          Interested industries (pick up to {MAX_INTERESTED_INDUSTRIES})
        </p>
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((industry) => {
            const checked = selectedIndustries.includes(industry);
            const disabled =
              !checked && selectedIndustries.length >= MAX_INTERESTED_INDUSTRIES;
            return (
              <label
                key={industry}
                className={`text-sm rounded-full border px-3 py-1.5 cursor-pointer ${
                  checked
                    ? "bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 border-transparent"
                    : "border-neutral-300 dark:border-neutral-700"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <input
                  type="checkbox"
                  name="interested_industries"
                  value={industry}
                  checked={checked}
                  disabled={disabled}
                  onChange={() => toggleIndustry(industry)}
                  className="sr-only"
                />
                {industry}
              </label>
            );
          })}
        </div>
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-4 py-2 hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
