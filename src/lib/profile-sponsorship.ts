import type { Citizenship, VisaStatus } from "@/types/profile";

export function inferRequiresSponsorship(
  citizenship: Citizenship | null,
  visaStatus: VisaStatus | null,
): boolean | null {
  if (citizenship === "uk" || citizenship === "irish") return false;
  if (visaStatus === "ilr_settled") return false;
  if (citizenship === "other" && visaStatus) return true;
  return null;
}
