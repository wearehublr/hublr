import type { Application } from "@/types/application";
import type { HublrEvent } from "@/types/event";
import { ACTIVE_STAGES } from "@/lib/deadlines";

export interface CompanyEventMatch {
  company: string;
  event: HublrEvent;
}

/**
 * Surfaces one upcoming event per company the user is actively tracking
 * an application with, so "you saved Goldman Sachs, they have an event"
 * doesn't require the user to notice the connection themselves. Assumes
 * `events` is already sorted soonest-first (matches getUpcomingEvents),
 * so the first match per company is naturally the nearest one.
 */
export function getCompanyEventMatches(
  applications: Application[],
  events: HublrEvent[],
): CompanyEventMatch[] {
  const trackedCompanies = new Set(
    applications
      .filter((a) => ACTIVE_STAGES.has(a.stage))
      .map((a) => a.company.trim().toLowerCase()),
  );

  const matches: CompanyEventMatch[] = [];
  const seen = new Set<string>();

  for (const event of events) {
    if (!event.company) continue;
    const key = event.company.trim().toLowerCase();
    if (!trackedCompanies.has(key) || seen.has(key)) continue;
    seen.add(key);
    matches.push({ company: event.company, event });
  }

  return matches;
}
