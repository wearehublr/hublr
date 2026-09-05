"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import type { Opportunity, Category, Region, Status, VisaSponsorship } from "@/types/opportunity";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  REGIONS,
  REGION_LABELS,
  STATUSES,
  STATUS_LABELS,
  VISA_SPONSORSHIP_OPTIONS,
  VISA_SPONSORSHIP_LABELS,
} from "@/types/opportunity";
import { getSponsorshipDisplay } from "@/lib/visa-sponsorship";
import { isClosingWithinDays } from "@/lib/recommendations";
import DeadlineBadge from "@/app/components/DeadlineBadge";
import CompanyLogo from "@/app/components/CompanyLogo";
import VisaSponsorshipBadge from "@/app/components/VisaSponsorshipBadge";
import { trackApplication } from "@/app/opportunities/actions";
import { saveSearch } from "@/app/opportunities/saved-search-actions";
import { buildOpportunitySlug } from "@/lib/slug";
import { notifyApplyClick } from "@/lib/apply-tracking";
import { compareByDate } from "@/lib/sort-by-date";

const STATUS_DOT: Record<Status, string> = {
  open: "bg-emerald-500",
  upcoming: "bg-blue-500",
  rolling: "bg-violet-500",
  closed: "bg-neutral-400",
};

const SORT_OPTIONS = ["deadline", "company", "newest"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];
const SORT_LABELS: Record<SortOption, string> = {
  deadline: "Sort: Closest deadline",
  company: "Sort: Company A-Z",
  newest: "Sort: Newest added",
};

export default function OpportunityBrowser({
  opportunities,
  isLoggedIn,
  initialIndustry = null,
  initialCategory = null,
  initialRegion = null,
  initialRequiresSponsorship = null,
}: {
  opportunities: Opportunity[];
  isLoggedIn: boolean;
  initialIndustry?: string | null;
  initialCategory?: string | null;
  initialRegion?: string | null;
  initialRequiresSponsorship?: boolean | null;
}) {
  const initialIndustries = useMemo(() => {
    const set = new Set<string>();
    for (const o of opportunities) {
      if (o.industry) set.add(o.industry);
    }
    return set;
  }, [opportunities]);
  const initialIndustryMatch =
    initialIndustry && initialIndustries.has(initialIndustry) ? initialIndustry : null;
  const initialCategoryMatch =
    initialCategory && (CATEGORIES as readonly string[]).includes(initialCategory)
      ? (initialCategory as Category)
      : null;
  const initialRegionMatch =
    initialRegion && (REGIONS as readonly string[]).includes(initialRegion)
      ? (initialRegion as Region)
      : null;
  const initialVisaMatch = initialRequiresSponsorship === true ? "yes" : null;
  const autoFilterLabel = [
    initialIndustryMatch,
    initialCategoryMatch ? CATEGORY_LABELS[initialCategoryMatch] : null,
    initialRegionMatch ? REGION_LABELS[initialRegionMatch] : null,
    initialVisaMatch ? "sponsors visas" : null,
  ]
    .filter(Boolean)
    .join(", ");

  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<Region | "all">(initialRegionMatch ?? "all");
  const [category, setCategory] = useState<Category | "all">(initialCategoryMatch ?? "all");
  const [status, setStatus] = useState<Status | "all">("all");
  const [industry, setIndustry] = useState<string>(initialIndustryMatch ?? "all");
  const [visaSponsorship, setVisaSponsorship] = useState<VisaSponsorship | "all">(
    initialVisaMatch ?? "all",
  );
  const [year, setYear] = useState<number | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("deadline");
  const [tracked, setTracked] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();
  const [alertSaved, setAlertSaved] = useState(false);
  const [alertSaving, setAlertSaving] = useState(false);
  const [autoFiltered, setAutoFiltered] = useState(
    !!(initialIndustryMatch || initialCategoryMatch || initialRegionMatch || initialVisaMatch),
  );
  const [closingSoonOnly, setClosingSoonOnly] = useState(false);

  const closingSoonCount = useMemo(
    () => opportunities.filter((o) => isClosingWithinDays(o, 7)).length,
    [opportunities],
  );
  const sponsorsVisaCount = useMemo(
    () => opportunities.filter((o) => o.visa_sponsorship === "yes").length,
    [opportunities],
  );
  const hasRecommendation = !!(
    initialIndustryMatch ||
    initialCategoryMatch ||
    initialRegionMatch ||
    initialVisaMatch
  );
  const recommendedCount = useMemo(() => {
    if (!hasRecommendation) return 0;
    return opportunities.filter((o) => {
      if (o.status === "closed") return false;
      if (initialIndustryMatch && o.industry === initialIndustryMatch) return true;
      if (initialCategoryMatch && o.category === initialCategoryMatch) return true;
      if (initialRegionMatch && o.region === initialRegionMatch) return true;
      if (initialVisaMatch && o.visa_sponsorship === "yes") return true;
      return false;
    }).length;
  }, [
    opportunities,
    hasRecommendation,
    initialIndustryMatch,
    initialCategoryMatch,
    initialRegionMatch,
    initialVisaMatch,
  ]);

  function toggleClosingSoon() {
    setClosingSoonOnly((prev) => !prev);
  }

  function toggleSponsorsVisa() {
    setVisaSponsorship((prev) => (prev === "yes" ? "all" : "yes"));
    setAutoFiltered(false);
  }

  function toggleRecommended() {
    if (autoFiltered) {
      setIndustry("all");
      setCategory("all");
      setRegion("all");
      setVisaSponsorship("all");
      setAutoFiltered(false);
    } else {
      setIndustry(initialIndustryMatch ?? "all");
      setCategory(initialCategoryMatch ?? "all");
      setRegion(initialRegionMatch ?? "all");
      setVisaSponsorship(initialVisaMatch ?? "all");
      setAutoFiltered(true);
    }
  }

  function handleTrack(id: string) {
    startTransition(async () => {
      await trackApplication(id);
      setTracked((prev) => new Set(prev).add(id));
    });
  }

  const activeFilterLabel = useMemo(() => {
    const parts = [
      region !== "all" ? REGION_LABELS[region] : null,
      category !== "all" ? CATEGORY_LABELS[category] : null,
      status !== "all" ? STATUS_LABELS[status] : null,
      industry !== "all" ? industry : null,
      visaSponsorship !== "all" ? VISA_SPONSORSHIP_LABELS[visaSponsorship] : null,
      search.trim() ? `"${search.trim()}"` : null,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(" · ") : "All opportunities";
  }, [region, category, status, industry, visaSponsorship, search]);

  const hasActiveFilters =
    region !== "all" ||
    category !== "all" ||
    status !== "all" ||
    industry !== "all" ||
    visaSponsorship !== "all" ||
    search.trim() !== "";

  function handleSaveAlert() {
    setAlertSaving(true);
    startTransition(async () => {
      await saveSearch(activeFilterLabel, {
        region: region === "all" ? null : region,
        category: category === "all" ? null : category,
        visaSponsorship: visaSponsorship === "all" ? null : visaSponsorship,
        industry: industry === "all" ? null : industry,
        keyword: search.trim() || null,
      });
      setAlertSaving(false);
      setAlertSaved(true);
    });
  }

  const industries = useMemo(
    () => Array.from(initialIndustries).sort(),
    [initialIndustries],
  );

  const years = useMemo(() => {
    const set = new Set<number>();
    for (const o of opportunities) set.add(o.cycle_year);
    return Array.from(set).sort((a, b) => b - a);
  }, [opportunities]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const result = opportunities.filter((o) => {
      if (year !== "all" && o.cycle_year !== year) return false;
      if (region !== "all" && o.region !== region) return false;
      if (category !== "all" && o.category !== category) return false;
      if (status !== "all" && o.status !== status) return false;
      if (industry !== "all" && o.industry !== industry) return false;
      if (visaSponsorship !== "all" && o.visa_sponsorship !== visaSponsorship)
        return false;
      if (closingSoonOnly && !isClosingWithinDays(o, 7)) return false;
      if (
        q &&
        !`${o.company} ${o.role_title}`.toLowerCase().includes(q)
      )
        return false;
      return true;
    });

    const sorted = [...result];
    if (sortBy === "company") {
      sorted.sort((a, b) => a.company.localeCompare(b.company));
    } else if (sortBy === "newest") {
      sorted.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    } else {
      sorted.sort((a, b) => compareByDate(a.deadline, b.deadline));
    }
    return sorted;
  }, [
    opportunities,
    search,
    year,
    region,
    category,
    status,
    industry,
    visaSponsorship,
    closingSoonOnly,
    sortBy,
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={toggleClosingSoon}
          className={`flex-1 min-w-[150px] rounded-lg border p-3 text-left transition-colors ${
            closingSoonOnly
              ? "border-red-400 dark:border-red-800 bg-red-50 dark:bg-red-950/30"
              : "border-neutral-200 dark:border-neutral-800 hover:border-red-300 dark:hover:border-red-800"
          }`}
        >
          <p className="text-2xl font-bold tracking-tight text-red-600 dark:text-red-400">
            {closingSoonCount}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            🔥 Closing within 7 days
          </p>
        </button>

        {hasRecommendation && (
          <button
            type="button"
            onClick={toggleRecommended}
            className={`flex-1 min-w-[150px] rounded-lg border p-3 text-left transition-colors ${
              autoFiltered
                ? "border-brand dark:border-brand-light bg-brand/5 dark:bg-brand-light/10"
                : "border-neutral-200 dark:border-neutral-800 hover:border-brand/50 dark:hover:border-brand-light/50"
            }`}
          >
            <p className="text-2xl font-bold tracking-tight text-brand dark:text-brand-light">
              {recommendedCount}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              🎯 Recommended for you
            </p>
          </button>
        )}

        <button
          type="button"
          onClick={toggleSponsorsVisa}
          className={`flex-1 min-w-[150px] rounded-lg border p-3 text-left transition-colors ${
            visaSponsorship === "yes"
              ? "border-emerald-400 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30"
              : "border-neutral-200 dark:border-neutral-800 hover:border-emerald-300 dark:hover:border-emerald-800"
          }`}
        >
          <p className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
            {sponsorsVisaCount}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            🌍 Sponsors visas
          </p>
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <input
          type="search"
          placeholder="Search company or role..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setAutoFiltered(false);
          }}
          className="w-full sm:w-64 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400"
        />

        {years.length > 1 && (
          <select
            value={year}
            onChange={(e) =>
              setYear(e.target.value === "all" ? "all" : Number(e.target.value))
            }
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm font-medium"
          >
            <option value="all">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        )}

        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value as Region | "all");
            setAutoFiltered(false);
          }}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          <option value="all">All regions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {REGION_LABELS[r]}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value as Category | "all");
            setAutoFiltered(false);
          }}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as Status | "all");
            setAutoFiltered(false);
          }}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>

        {industries.length > 0 && (
          <select
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value);
              setAutoFiltered(false);
            }}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
          >
            <option value="all">All industries</option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        )}

        <select
          value={visaSponsorship}
          onChange={(e) => {
            setVisaSponsorship(e.target.value as VisaSponsorship | "all");
            setAutoFiltered(false);
          }}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          <option value="all">Visa sponsorship: all</option>
          {VISA_SPONSORSHIP_OPTIONS.map((v) => (
            <option key={v} value={v}>
              {VISA_SPONSORSHIP_LABELS[v]}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {SORT_LABELS[s]}
            </option>
          ))}
        </select>

        {isLoggedIn && hasActiveFilters && (
          <button
            type="button"
            onClick={handleSaveAlert}
            disabled={alertSaving || alertSaved}
            className="rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-2 disabled:opacity-60"
          >
            {alertSaved
              ? "Alert saved ✓"
              : alertSaving
                ? "Saving..."
                : "Get alerted for this search"}
          </button>
        )}

      </div>

      {autoFiltered && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Filtered to <strong>{autoFilterLabel}</strong> based on your profile. Click{" "}
          <strong>Get alerted for this search</strong> to get emailed when new
          matches appear, or change the filters above to see everything.
        </p>
      )}

      <div className="flex items-center">
        <span className="sm:ml-auto text-sm text-neutral-500 dark:text-neutral-400">
          {filtered.length} of {opportunities.length} opportunities
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 py-12 text-center">
          No opportunities match your filters.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((o) => {
            const sponsorship = getSponsorshipDisplay(o);
            return (
            <li
              key={o.id}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 flex flex-col gap-2 bg-white dark:bg-neutral-900"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 min-w-0">
                  <CompanyLogo company={o.company} logoUrl={o.logo_url} />
                  <Link
                    href={`/opportunity/${buildOpportunitySlug(o)}`}
                    className="hover:underline min-w-0"
                  >
                    <p className="font-semibold leading-tight">{o.company}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-tight">
                      {o.role_title}
                    </p>
                  </Link>
                </div>
                <span
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[o.status]}`}
                  title={STATUS_LABELS[o.status]}
                />
              </div>

              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="rounded-full bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 px-2 py-0.5 font-medium">
                  {o.cycle_year}
                </span>
                <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
                  {CATEGORY_LABELS[o.category]}
                </span>
                <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
                  {REGION_LABELS[o.region]}
                  {o.city || o.country
                    ? ` · ${[o.city, o.country].filter(Boolean).join(", ")}`
                    : ""}
                </span>
                {o.industry && (
                  <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
                    {o.industry}
                  </span>
                )}
                {sponsorship && <VisaSponsorshipBadge sponsorship={sponsorship} />}
              </div>

              <DeadlineBadge deadline={o.deadline} />

              {o.notes && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {o.notes}
                </p>
              )}

              <div className="mt-auto flex gap-2">
                <a
                  href={`/go/${o.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    isLoggedIn &&
                    notifyApplyClick({
                      id: o.id,
                      company: o.company,
                      role_title: o.role_title,
                    })
                  }
                  className="flex-1 inline-flex items-center justify-center rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-3 py-1.5 hover:opacity-90"
                >
                  Apply
                </a>
                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={() => handleTrack(o.id)}
                    disabled={isPending || tracked.has(o.id)}
                    className="flex-1 inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-1.5 disabled:opacity-60"
                  >
                    {tracked.has(o.id) ? "Tracked ✓" : "Track"}
                  </button>
                ) : (
                  <a
                    href="/login?next=/opportunities"
                    className="flex-1 inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-1.5"
                  >
                    Log in to track
                  </a>
                )}
              </div>
            </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
