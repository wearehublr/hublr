import type { Opportunity } from "@/types/opportunity";

export type SponsorshipDisplay = "yes" | "no" | "unconfirmed" | "not_tracked";

export const SPONSORSHIP_METHODOLOGY: Record<SponsorshipDisplay, string> = {
  yes: "Confirmed from the employer's current job posting or careers page.",
  unconfirmed:
    "Hublr has not found sufficiently reliable evidence that sponsorship is available for this specific role.",
  no: "The employer explicitly states that sponsorship is unavailable for this role.",
  not_tracked:
    "Hublr only tracks visa sponsorship for UK-based roles (the UK Skilled Worker sponsor licence). Sponsorship works differently outside the UK and isn't tracked here - check the employer's own careers page for their process.",
};

/**
 * Sponsorship tracking is UK-specific (the UK Skilled Worker sponsor
 * licence register) - it says nothing about US/EU work-visa sponsorship,
 * which works completely differently. Showing "unconfirmed" on a non-UK
 * role would wrongly imply we checked and couldn't confirm, so those get
 * their own "not_tracked" state instead.
 *
 * For UK roles: role-level visa_sponsorship wins whenever the posting
 * actually says something. Only when it's silent ("unknown") do we fall
 * back to the company-level sponsor-register fact, and only in the "no
 * licence at all" direction, since holding a licence doesn't guarantee
 * this specific role sponsors. Always returns a value (never null) so the
 * UI shows an explicit "not confirmed" state instead of silently omitting
 * the badge - silence reads as "nothing to say" when it should read as
 * "we don't know."
 */
export function getSponsorshipDisplay(
  opportunity: Pick<
    Opportunity,
    "region" | "visa_sponsorship" | "company_sponsor_licence"
  >,
): SponsorshipDisplay {
  if (opportunity.region !== "uk") return "not_tracked";
  if (opportunity.visa_sponsorship === "yes") return "yes";
  if (opportunity.visa_sponsorship === "no") return "no";
  if (opportunity.company_sponsor_licence === false) return "no";
  return "unconfirmed";
}
