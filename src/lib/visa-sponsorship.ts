import type { Opportunity } from "@/types/opportunity";

export type SponsorshipDisplay = "yes" | "no" | "unconfirmed";

export const SPONSORSHIP_METHODOLOGY: Record<SponsorshipDisplay, string> = {
  yes: "Confirmed from the employer's current job posting or careers page.",
  unconfirmed:
    "Hublr has not found sufficiently reliable evidence that sponsorship is available for this specific role.",
  no: "The employer explicitly states that sponsorship is unavailable for this role.",
};

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
