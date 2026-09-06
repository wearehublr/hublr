"use client";

import Script from "next/script";

// Renders nothing if no site key is configured, so local dev / previews
// without Turnstile set up don't show a broken widget - verifyTurnstileToken
// fails open in that case too, so signup/reset still work either way.
export default function Turnstile() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) return null;

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div className="cf-turnstile" data-sitekey={siteKey} />
    </>
  );
}
