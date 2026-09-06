import type { Application } from "@/types/application";
import type { Opportunity } from "@/types/opportunity";
import { ACTIVE_STAGES } from "@/lib/deadlines";

export interface CompanyOpportunityMatch {
  company: string;
  opportunity: Opportunity;
}

/**
 * Surfaces one new (not-yet-tracked) opportunity per company the user is
 * actively tracking an application with - "a company you're tracking just
 * posted a new role" - mirroring getCompanyEventMatches. Assumes
 * `opportunities` is already sorted soonest-deadline-first (matches
 * getPublishedOpportunities), so the first match per company is the most
 * urgent one.
 */
export function getCompanyOpportunityMatches(
  applications: Application[],
  opportunities: Opportunity[],
): CompanyOpportunityMatch[] {
  const trackedCompanies = new Set(
    applications
      .filter((a) => ACTIVE_STAGES.has(a.stage))
      .map((a) => a.company.trim().toLowerCase()),
  );
  const trackedOpportunityIds = new Set(
    applications.map((a) => a.opportunity_id).filter((id): id is string => id !== null),
  );

  const matches: CompanyOpportunityMatch[] = [];
  const seen = new Set<string>();

  for (const opportunity of opportunities) {
    if (opportunity.status === "closed") continue;
    if (trackedOpportunityIds.has(opportunity.id)) continue;
    const key = opportunity.company.trim().toLowerCase();
    if (!trackedCompanies.has(key) || seen.has(key)) continue;
    seen.add(key);
    matches.push({ company: opportunity.company, opportunity });
  }

  return matches;
}
