import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs/config";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // CVs/cover letters (PDF/DOCX) can exceed the 1MB default.
      bodySizeLimit: "10mb",
    },
  },
};

// org/project/authToken come from SENTRY_ORG / SENTRY_PROJECT /
// SENTRY_AUTH_TOKEN env vars - harmless no-op build step until those and
// NEXT_PUBLIC_SENTRY_DSN are set in Vercel.
export default withSentryConfig(nextConfig, {
  silent: !process.env.CI,
});
