import type { Application } from "@/types/application";

export const ACTIVE_STAGES = new Set([
  "saved",
  "applied",
  "oa_assessment",
  "interview",
  "offer",
]);

export function filterUpcomingDeadlines(
  applications: Application[],
  windowDays: number,
): Application[] {
  const now = Date.now();
  return applications
    .filter((a) => {
      if (!a.deadline || !ACTIVE_STAGES.has(a.stage)) return false;
      const days = (new Date(a.deadline).getTime() - now) / (1000 * 60 * 60 * 24);
      return days >= 0 && days <= windowDays;
    })
    .sort((a, b) => (a.deadline! > b.deadline! ? 1 : -1));
}
