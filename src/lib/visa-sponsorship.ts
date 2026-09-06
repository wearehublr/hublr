import type { Opportunity } from "@/types/opportunity";

export type SponsorshipDisplay = "yes" | "no" | "unconfirmed";

/**
 * Role-level visa_sponsorship wins whenever the posting actually says
 * something. Only when it's silent ("unknown") do we fall back to the
 * company-level sponsor-register fact, and only in the "no licence at
 * all" direction, since holding a licence doesn't guarantee this specific
 * role sponsors. Always returns a value (never null) so the UI shows an
 * explicit "not confirmed" state instead of silently omitting the badge -
 * silence reads as "nothing to say" when it should read as "we don't know."
 */
export function getSponsorshipDisplay(
  opportunity: Pick<Opportunity, "visa_sponsorship" | "company_sponsor_licence">,
): SponsorshipDisplay {
  if (opportunity.visa_sponsorship === "yes") return "yes";
  if (opportunity.visa_sponsorship === "no") return "no";
  if (opportunity.company_sponsor_licence === false) return "no";
  return "unconfirmed";
}
