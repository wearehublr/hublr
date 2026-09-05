import type { Opportunity } from "@/types/opportunity";
import { CATEGORY_LABELS, REGION_LABELS } from "@/types/opportunity";
import type { Profile } from "@/types/profile";
import { compareByDate } from "@/lib/sort-by-date";

export interface RecommendedMatch {
  opportunity: Opportunity;
  reasons: string[];
}

function scoreOpportunity(
  opportunity: Opportunity,
  profile: Profile,
): string[] {
  const reasons: string[] = [];

  if (opportunity.industry && profile.interested_industries.includes(opportunity.industry)) {
    reasons.push(opportunity.industry);
  }
  if (profile.preferred_categories.includes(opportunity.category)) {
    reasons.push(CATEGORY_LABELS[opportunity.category]);
  }
  if (profile.preferred_regions.includes(opportunity.region)) {
    reasons.push(REGION_LABELS[opportunity.region]);
  }
  if (profile.requires_sponsorship === true && opportunity.visa_sponsorship === "yes") {
    reasons.push("Sponsors visas");
  }

  return reasons;
}

export function getRecommendedOpportunities(
  opportunities: Opportunity[],
  profile: Profile | null,
  limit: number,
): RecommendedMatch[] {
  const open = opportunities.filter((o) => o.status !== "closed");

  const scored = profile
    ? open.map((opportunity) => ({
        opportunity,
        reasons: scoreOpportunity(opportunity, profile),
      }))
    : open.map((opportunity) => ({ opportunity, reasons: [] as string[] }));

  const matched = scored.filter((m) => m.reasons.length > 0);

  if (matched.length === 0) {
    return [...open]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit)
      .map((opportunity) => ({ opportunity, reasons: [] }));
  }

  matched.sort((a, b) => {
    if (b.reasons.length !== a.reasons.length) return b.reasons.length - a.reasons.length;
    return compareByDate(a.opportunity.deadline, b.opportunity.deadline);
  });

  const top = matched.slice(0, limit);
  if (top.length >= limit) return top;

  const matchedIds = new Set(top.map((m) => m.opportunity.id));
  const fillers = scored
    .filter((m) => !matchedIds.has(m.opportunity.id))
    .sort(
      (a, b) =>
        new Date(b.opportunity.created_at).getTime() -
        new Date(a.opportunity.created_at).getTime(),
    )
    .slice(0, limit - top.length);

  return [...top, ...fillers];
}

export function countClosingWithinDays(
  opportunities: Opportunity[],
  days: number,
): number {
  const now = Date.now();
  const windowEnd = now + days * 24 * 60 * 60 * 1000;
  return opportunities.filter(
    (o) =>
      o.status !== "closed" &&
      o.deadline !== null &&
      new Date(o.deadline).getTime() >= now &&
      new Date(o.deadline).getTime() <= windowEnd,
  ).length;
}
