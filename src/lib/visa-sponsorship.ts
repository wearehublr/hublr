import type { Opportunity } from "@/types/opportunity";

export type SponsorshipDisplay = "yes" | "no";

/**
 * Role-level visa_sponsorship wins whenever the posting actually says
 * something. Only when it's silent ("unknown") do we fall back to the
 * company-level sponsor-register fact, and only in the "no licence at
 * all" direction, since holding a licence doesn't guarantee this specific
 * role sponsors.
 */
export function getSponsorshipDisplay(
  opportunity: Pick<Opportunity, "visa_sponsorship" | "company_sponsor_licence">,
): SponsorshipDisplay | null {
  if (opportunity.visa_sponsorship === "yes") return "yes";
  if (opportunity.visa_sponsorship === "no") return "no";
  if (opportunity.company_sponsor_licence === false) return "no";
  return null;
}
