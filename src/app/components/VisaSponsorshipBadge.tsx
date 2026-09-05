import type { SponsorshipDisplay } from "@/lib/visa-sponsorship";

export default function VisaSponsorshipBadge({
  sponsorship,
}: {
  sponsorship: SponsorshipDisplay;
}) {
  return (
    <span
      className={
        sponsorship === "yes"
          ? "rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-0.5"
          : "rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5"
      }
    >
      {sponsorship === "yes" ? "Sponsors visas" : "Does not sponsor visas"}
    </span>
  );
}
