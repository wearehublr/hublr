"use client";

import { useActionState, useState } from "react";
import { updateProfile } from "./actions";
import type { Profile, Citizenship } from "@/types/profile";
import {
  STUDY_YEARS,
  STUDENT_STATUSES,
  STUDENT_STATUS_LABELS,
  INDUSTRIES,
  MAX_INTERESTED_INDUSTRIES,
  CITIZENSHIP_OPTIONS,
  CITIZENSHIP_LABELS,
  VISA_STATUSES,
  VISA_STATUS_LABELS,
} from "@/types/profile";

const initialState = { error: null };

export default function ProfileForm({ profile }: { profile: Profile | null }) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    profile?.interested_industries ?? [],
  );
  const [citizenship, setCitizenship] = useState<Citizenship | "">(
    profile?.citizenship ?? "",
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
        <input
          type="number"
          name="graduation_year"
          defaultValue={profile?.graduation_year ?? ""}
          placeholder="Graduation year (e.g. 2027)"
          min={2020}
          max={2035}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        />
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

      <div>
        <label className="text-sm font-medium mb-1 block" htmlFor="citizenship">
          Citizenship
        </label>
        <select
          id="citizenship"
          name="citizenship"
          value={citizenship}
          onChange={(e) => setCitizenship(e.target.value as Citizenship | "")}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm w-full sm:w-auto"
        >
          <option value="">Select citizenship</option>
          {CITIZENSHIP_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {CITIZENSHIP_LABELS[c]}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          Helps us understand your visa situation. Not shown publicly or used to filter opportunities.
        </p>
      </div>

      {citizenship === "other" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            name="visa_status"
            defaultValue={profile?.visa_status ?? ""}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
          >
            <option value="">Visa status</option>
            {VISA_STATUSES.map((v) => (
              <option key={v} value={v}>
                {VISA_STATUS_LABELS[v]}
              </option>
            ))}
          </select>
          <div>
            <input
              type="date"
              name="visa_expiry"
              defaultValue={profile?.visa_expiry ?? ""}
              aria-label="Visa expiry date"
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm w-full"
            />
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Visa expiry date (optional)
            </p>
          </div>
        </div>
      )}

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

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="email_notifications_enabled"
          defaultChecked={profile?.email_notifications_enabled ?? true}
          className="h-4 w-4"
        />
        Email me when I track an opportunity and as deadlines approach
      </label>

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
