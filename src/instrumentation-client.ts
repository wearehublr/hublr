import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  // Thrown by the MetaMask browser extension on visitors' machines, not by us.
  ignoreErrors: [/Failed to connect to MetaMask/i],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
