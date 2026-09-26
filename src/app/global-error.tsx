"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// redirect() and notFound() (used throughout this app, e.g. the homepage
// sending an incomplete profile to /onboarding) work by throwing a special
// object tagged with a "NEXT_REDIRECT" or "NEXT_HTTP_ERROR_FALLBACK" digest,
// which Next.js's own router is meant to intercept before it becomes a real
// error - it's navigation control flow, not a bug. If one of these ever
// reaches this boundary anyway, capturing it in Sentry is just noise: it
// shows up with no message and no useful stack (seen in production as
// HUBLR-7, 240 events on the homepage with the reported type "I" and no
// error message).
function isNextRouterControlFlow(digest?: string): boolean {
  return !!digest && (digest.startsWith("NEXT_REDIRECT") || digest.startsWith("NEXT_HTTP_ERROR_FALLBACK"));
}

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    if (!isNextRouterControlFlow(error.digest)) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-2 px-4 text-center">
        <h1 className="text-lg font-semibold">Something went wrong</h1>
        <p className="text-sm text-neutral-500">
          We&apos;ve been notified and are looking into it. Try refreshing the page.
        </p>
      </body>
    </html>
  );
}
