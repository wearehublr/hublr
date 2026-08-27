import type { EligibilityResult } from "@/lib/eligibility";

const VERDICT_STYLES: Record<EligibilityResult["verdict"], string> = {
  green:
    "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200",
  amber:
    "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200",
  red: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
};

const VERDICT_LABELS: Record<EligibilityResult["verdict"], string> = {
  green: "You're eligible",
  amber: "Check eligibility",
  red: "Likely not eligible",
};

export default function EligibilityBadge({
  result,
}: {
  result: EligibilityResult;
}) {
  return (
    <span
      title={result.reason}
      className={`rounded-full px-2 py-0.5 ${VERDICT_STYLES[result.verdict]}`}
    >
      {VERDICT_LABELS[result.verdict]}
    </span>
  );
}
