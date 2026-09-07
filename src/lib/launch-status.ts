// LAUNCH_AT (an ISO datetime) takes priority when set and parseable: the
// site gates until that moment, then opens itself automatically on the
// next request after it passes - no manual flip needed. Falls back to the
// plain WAITLIST_MODE on/off switch otherwise, so the existing manual
// workflow keeps working if no launch time is configured. Shared between
// the site-wide gate (proxy.ts) and the /waitlist page itself, so a stale
// link to /waitlist redirects to /signup once launched instead of still
// asking people to join a waitlist for a site that's already live.
export function isPreLaunch(): boolean {
  const launchAt = process.env.LAUNCH_AT;
  if (launchAt) {
    const launchTime = new Date(launchAt).getTime();
    if (!Number.isNaN(launchTime)) {
      return Date.now() < launchTime;
    }
  }
  return process.env.WAITLIST_MODE === "true";
}
