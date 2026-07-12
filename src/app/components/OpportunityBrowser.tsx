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
import DeadlineBadge from "@/app/components/DeadlineBadge";
import CompanyLogo from "@/app/components/CompanyLogo";
import { trackApplication } from "@/app/opportunities/actions";
import { saveSearch } from "@/app/opportunities/saved-search-actions";
import { buildOpportunitySlug } from "@/lib/slug";
import { notifyApplyClick } from "@/lib/apply-tracking";

const STATUS_DOT: Record<Status, string> = {
  open: "bg-emerald-500",
  upcoming: "bg-blue-500",
  rolling: "bg-violet-500",
  closed: "bg-neutral-400",
};

export default function OpportunityBrowser({
  opportunities,
  isLoggedIn,
}: {
  opportunities: Opportunity[];
  isLoggedIn: boolean;
}) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<Region | "all">("all");
  const [category, setCategory] = useState<Category | "all">("all");
  const [status, setStatus] = useState<Status | "all">("all");
  const [industry, setIndustry] = useState<string>("all");
  const [visaSponsorship, setVisaSponsorship] = useState<VisaSponsorship | "all">("all");
  const [year, setYear] = useState<number | "all">("all");
  const [tracked, setTracked] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();
  const [alertSaved, setAlertSaved] = useState(false);
  const [alertSaving, setAlertSaving] = useState(false);

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

  const industries = useMemo(() => {
    const set = new Set<string>();
    for (const o of opportunities) {
      if (o.industry) set.add(o.industry);
    }
    return Array.from(set).sort();
  }, [opportunities]);

  const years = useMemo(() => {
    const set = new Set<number>();
    for (const o of opportunities) set.add(o.cycle_year);
    return Array.from(set).sort((a, b) => b - a);
  }, [opportunities]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return opportunities.filter((o) => {
      if (year !== "all" && o.cycle_year !== year) return false;
      if (region !== "all" && o.region !== region) return false;
      if (category !== "all" && o.category !== category) return false;
      if (status !== "all" && o.status !== status) return false;
      if (industry !== "all" && o.industry !== industry) return false;
      if (visaSponsorship !== "all" && o.visa_sponsorship !== visaSponsorship)
        return false;
      if (
        q &&
        !`${o.company} ${o.role_title}`.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [opportunities, search, year, region, category, status, industry, visaSponsorship]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <input
          type="search"
          placeholder="Search company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
          onChange={(e) => setRegion(e.target.value as Region | "all")}
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
          onChange={(e) => setCategory(e.target.value as Category | "all")}
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
          onChange={(e) => setStatus(e.target.value as Status | "all")}
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
            onChange={(e) => setIndustry(e.target.value)}
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
          onChange={(e) => setVisaSponsorship(e.target.value as VisaSponsorship | "all")}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
        >
          <option value="all">Visa sponsorship: all</option>
          {VISA_SPONSORSHIP_OPTIONS.map((v) => (
            <option key={v} value={v}>
              {VISA_SPONSORSHIP_LABELS[v]}
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
          {filtered.map((o) => (
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
                {o.visa_sponsorship === "yes" && (
                  <span className="rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-0.5">
                    Sponsors visas
                  </span>
                )}
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
                    href="/login"
                    className="flex-1 inline-flex items-center justify-center rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-1.5"
                  >
                    Log in to track
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
