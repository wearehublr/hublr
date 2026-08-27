import type { Profile, VisaStatus } from "@/types/profile";
import type { Opportunity } from "@/types/opportunity";

export type EligibilityVerdict = "green" | "amber" | "red";

export interface EligibilityResult {
  verdict: EligibilityVerdict;
  reason: string;
}

const UNRESTRICTED_VISA_STATUSES: VisaStatus[] = ["spouse_visa", "ilr_settled"];

export function computeEligibility(
  profile: Profile | null,
  opportunity: Opportunity,
): EligibilityResult | null {
  if (!profile?.citizenship) return null;

  if (profile.citizenship === "uk" || profile.citizenship === "irish") {
    return {
      verdict: "green",
      reason: "UK/Irish citizens have unrestricted right to work, regardless of this employer's sponsorship stance.",
    };
  }

  const visaStatus = profile.visa_status;
  const sponsorship = opportunity.visa_sponsorship;

  if (sponsorship === "yes") {
    return {
      verdict: "green",
      reason: "This employer sponsors work visas.",
    };
  }

  if (visaStatus && UNRESTRICTED_VISA_STATUSES.includes(visaStatus)) {
    return {
      verdict: "green",
      reason: "Your visa status already gives you unrestricted right to work, regardless of this employer's sponsorship stance.",
    };
  }

  if (sponsorship === "no") {
    if (visaStatus === "graduate_visa") {
      return {
        verdict: "green",
        reason: "A Graduate visa gives you full-time work rights with no employer sponsorship needed.",
      };
    }
    if (visaStatus === "skilled_worker_visa") {
      return {
        verdict: "amber",
        reason: "This employer doesn't sponsor. Moving to them would need your Skilled Worker sponsorship transferred — check with them directly.",
      };
    }
    if (visaStatus === "other") {
      return {
        verdict: "amber",
        reason: "This employer doesn't sponsor. Whether your current visa covers this role depends on its specific terms — check before applying.",
      };
    }
    if (visaStatus === "student_visa") {
      return {
        verdict: "red",
        reason: "This employer doesn't sponsor, and a Student visa doesn't carry full-time work rights.",
      };
    }
    // "none" or unset — no visa yet and no sponsorship offered.
    return {
      verdict: "red",
      reason: "This employer doesn't sponsor, and you don't yet have a visa that grants UK work rights.",
    };
  }

  // sponsorship === "unknown"
  if (visaStatus === "graduate_visa") {
    return {
      verdict: "amber",
      reason: "Sponsorship isn't confirmed. Your Graduate visa covers you for now, but check their long-term sponsorship stance.",
    };
  }
  if (visaStatus === "student_visa") {
    return {
      verdict: "amber",
      reason: "Sponsorship isn't confirmed, and a Student visa doesn't carry full-time work rights on its own.",
    };
  }
  if (visaStatus === "skilled_worker_visa") {
    return {
      verdict: "amber",
      reason: "Sponsorship isn't confirmed, and moving employers would need your sponsorship transferred.",
    };
  }
  // "other" or "none"/unset
  return {
    verdict: "amber",
    reason: "This employer's sponsorship stance isn't confirmed — check with them before applying.",
  };
}
