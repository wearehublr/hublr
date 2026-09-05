"use client";

import { useActionState, useState } from "react";
import { completeOnboarding } from "./actions";
import { inferRequiresSponsorship } from "@/lib/profile-sponsorship";
import { INDUSTRIES, MAX_INTERESTED_INDUSTRIES } from "@/types/profile";
import type { Profile } from "@/types/profile";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  REGIONS,
  REGION_LABELS,
} from "@/types/opportunity";

const MAX_CATEGORIES = 3;
const MAX_REGIONS = 2;

const initialState = { error: null };

function PillOption({
  label,
  checked,
  disabled,
  onChange,
  name,
  value,
}: {
  label: string;
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
  name: string;
  value: string;
}) {
  return (
    <label
      className={`text-sm rounded-full border px-3 py-1.5 cursor-pointer ${
        checked
          ? "bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 border-transparent"
          : "border-neutral-300 dark:border-neutral-700"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only"
      />
      {label}
    </label>
  );
}

export default function OnboardingForm({
  profile,
  next,
}: {
  profile: Profile | null;
  next: string;
}) {
  const [state, formAction, pending] = useActionState(
    completeOnboarding,
    initialState,
  );
  const [industries, setIndustries] = useState<string[]>(
    profile?.interested_industries ?? [],
  );
  const [categories, setCategories] = useState<string[]>(
    profile?.preferred_categories ?? [],
  );
  const [regions, setRegions] = useState<string[]>(
    profile?.preferred_regions ?? [],
  );
  const inferredSponsorship = inferRequiresSponsorship(
    profile?.citizenship ?? null,
    profile?.visa_status ?? null,
  );
  const [sponsorship, setSponsorship] = useState<"yes" | "no" | "">(
    profile?.requires_sponsorship !== null && profile?.requires_sponsorship !== undefined
      ? profile.requires_sponsorship
        ? "yes"
        : "no"
      : inferredSponsorship !== null
        ? inferredSponsorship
          ? "yes"
          : "no"
        : "",
  );

  function toggle(
    list: string[],
    setList: (v: string[]) => void,
    value: string,
    max: number,
  ) {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else if (list.length < max) {
      setList([...list, value]);
    }
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="next" value={next} />

      <div>
        <p className="text-sm font-medium mb-2">
          Which industries interest you? (pick up to {MAX_INTERESTED_INDUSTRIES})
        </p>
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((industry) => (
            <PillOption
              key={industry}
              name="interested_industries"
              value={industry}
              label={industry}
              checked={industries.includes(industry)}
              disabled={
                !industries.includes(industry) &&
                industries.length >= MAX_INTERESTED_INDUSTRIES
              }
              onChange={() =>
                toggle(industries, setIndustries, industry, MAX_INTERESTED_INDUSTRIES)
              }
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">
          What type of role? (pick up to {MAX_CATEGORIES})
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c !== "other").map((category) => (
            <PillOption
              key={category}
              name="preferred_categories"
              value={category}
              label={CATEGORY_LABELS[category]}
              checked={categories.includes(category)}
              disabled={
                !categories.includes(category) && categories.length >= MAX_CATEGORIES
              }
              onChange={() =>
                toggle(categories, setCategories, category, MAX_CATEGORIES)
              }
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">
          Where? (pick up to {MAX_REGIONS})
        </p>
        <div className="flex flex-wrap gap-2">
          {REGIONS.map((region) => (
            <PillOption
              key={region}
              name="preferred_regions"
              value={region}
              label={REGION_LABELS[region]}
              checked={regions.includes(region)}
              disabled={!regions.includes(region) && regions.length >= MAX_REGIONS}
              onChange={() => toggle(regions, setRegions, region, MAX_REGIONS)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">
          Do you need an employer to sponsor your UK work visa?
        </p>
        <div className="flex gap-2">
          <PillOption
            name="requires_sponsorship"
            value="yes"
            label="Yes"
            checked={sponsorship === "yes"}
            disabled={false}
            onChange={() => setSponsorship("yes")}
          />
          <PillOption
            name="requires_sponsorship"
            value="no"
            label="No"
            checked={sponsorship === "no"}
            disabled={false}
            onChange={() => setSponsorship("no")}
          />
        </div>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          UK/Irish citizens and anyone with settled status (ILR) usually
          answer no. You can change this anytime in your profile.
        </p>
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending || sponsorship === ""}
        className="self-start rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-4 py-2 hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Saving..." : "Show me my opportunities"}
      </button>
    </form>
  );
}
