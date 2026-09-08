import { SPONSORSHIP_METHODOLOGY, type SponsorshipDisplay } from "@/lib/visa-sponsorship";

const STYLES: Record<SponsorshipDisplay, string> = {
  yes: "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200",
  no: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
  unconfirmed: "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200",
  not_tracked: "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400",
};

const LABELS: Record<SponsorshipDisplay, string> = {
  yes: "🟢 Sponsorship available",
  no: "🔴 No sponsorship",
  unconfirmed: "🟡 Not confirmed",
  not_tracked: "⚪ Not tracked outside the UK",
};

function formatVerifiedDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Badge({ sponsorship }: { sponsorship: SponsorshipDisplay }) {
  return (
    <span className={`rounded-full px-2 py-0.5 ${STYLES[sponsorship]}`}>
      {LABELS[sponsorship]}
    </span>
  );
}

export default function VisaSponsorshipBadge({
  sponsorship,
  verifiedAt = null,
  showDetails = false,
}: {
  sponsorship: SponsorshipDisplay;
  verifiedAt?: string | null;
  showDetails?: boolean;
}) {
  if (!showDetails) {
    return <Badge sponsorship={sponsorship} />;
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Badge sponsorship={sponsorship} />
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md">
        {SPONSORSHIP_METHODOLOGY[sponsorship]}
      </p>
      {verifiedAt && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Last verified: {formatVerifiedDate(verifiedAt)}
        </p>
      )}
    </div>
  );
}
