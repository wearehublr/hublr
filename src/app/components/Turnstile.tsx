"use client";

import { useEffect, useId, useRef } from "react";

type TurnstileWidgetId = string;

interface TurnstileApi {
  render: (
    container: string | HTMLElement,
    options: {
      sitekey: string;
      "error-callback"?: () => void;
    },
  ) => TurnstileWidgetId;
  remove: (widgetId: TurnstileWidgetId) => void;
  reset: (widgetId: TurnstileWidgetId) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const SCRIPT_ID = "cf-turnstile-script";

// Explicit rendering (rather than the auto-render "drop a div with
// data-sitekey" approach) so we fully control the widget's lifecycle with
// React: it's created once per mount via a ref, and torn down with
// turnstile.remove() on unmount, instead of leaving Turnstile's own script
// to auto-scan the DOM and get confused when React re-renders the form
// (observed in production as Sentry error 300030, "widget seems to have
// crashed", right after a same-page navigation/revalidation).
function loadTurnstileScript(): Promise<TurnstileApi> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve(window.turnstile);
      return;
    }

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => {
        if (window.turnstile) resolve(window.turnstile);
        else reject(new Error("Turnstile script loaded but window.turnstile is missing"));
      });
      existing.addEventListener("error", () => reject(new Error("Failed to load Turnstile script")));
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("Turnstile script loaded but window.turnstile is missing"));
    };
    script.onerror = () => reject(new Error("Failed to load Turnstile script"));
    document.head.appendChild(script);
  });
}

// Renders nothing if no site key is configured, so local dev / previews
// without Turnstile set up don't show a broken widget - verifyTurnstileToken
// fails open in that case too, so signup/reset still work either way.
export default function Turnstile() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerId = useId();
  const widgetIdRef = useRef<TurnstileWidgetId | null>(null);

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled) return;
        const container = document.getElementById(containerId);
        if (!container) return;
        widgetIdRef.current = turnstile.render(container, {
          sitekey: siteKey,
          // Cloudflare's own recommended recovery from a crashed/hung
          // widget (error 300030 and similar) is to reset it rather than
          // leave the visitor stuck unable to submit the form.
          "error-callback": () => {
            if (widgetIdRef.current) {
              turnstile.reset(widgetIdRef.current);
            }
          },
        });
      })
      .catch((err) => {
        console.error("[turnstile]", err);
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, containerId]);

  if (!siteKey) return null;

  return <div id={containerId} />;
}
