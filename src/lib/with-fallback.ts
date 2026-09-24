import * as Sentry from "@sentry/nextjs";

// Supabase's REST gateway occasionally returns a transient 502/503/504
// (see resilient-fetch.ts) that outlasts its retry window. Wrapping a page's
// data queries in this turns that into a graceful fallback - reporting it
// for visibility - instead of crashing the whole page.
export function withFallback<T>(promise: Promise<T>, fallback: T): Promise<T> {
  return promise.catch((error) => {
    Sentry.captureException(error);
    return fallback;
  });
}
