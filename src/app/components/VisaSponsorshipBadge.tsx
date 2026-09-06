import type { SponsorshipDisplay } from "@/lib/visa-sponsorship";

const STYLES: Record<SponsorshipDisplay, string> = {
  yes: "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200",
  no: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
  unconfirmed: "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200",
};

const LABELS: Record<SponsorshipDisplay, string> = {
  yes: "🟢 Sponsorship available",
  no: "🔴 No sponsorship",
  unconfirmed: "🟡 Not confirmed",
};

export default function VisaSponsorshipBadge({
  sponsorship,
}: {
  sponsorship: SponsorshipDisplay;
}) {
  return (
    <span className={`rounded-full px-2 py-0.5 ${STYLES[sponsorship]}`}>
      {LABELS[sponsorship]}
    </span>
  );
}
