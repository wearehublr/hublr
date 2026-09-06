import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  // No-ops when dsn is unset, so this is safe with no Sentry project
  // configured yet (local dev, or before SENTRY_DSN is added in Vercel).
});
