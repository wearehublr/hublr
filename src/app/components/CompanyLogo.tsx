"use client";

import { useEffect, useRef, useState } from "react";

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1500;

export default function CompanyLogo({
  company,
  logoUrl,
  size = 40,
}: {
  company: string;
  logoUrl: string | null;
  size?: number;
}) {
  // The roles list renders ~2,500 logos at once and third-party hosts
  // sometimes drop a request under that burst, so a failed load is retried
  // a couple of times before settling on the letter tile.
  const [state, setState] = useState<"image" | "retrying" | "failed">("image");
  const attempts = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function handleError() {
    if (attempts.current >= MAX_RETRIES) {
      setState("failed");
      return;
    }
    attempts.current += 1;
    setState("retrying");
    timer.current = setTimeout(() => setState("image"), RETRY_DELAY_MS * attempts.current);
  }

  if (logoUrl && state === "image") {
    return (
      // Arbitrary admin-pasted external URLs can't use next/image's
      // domain-restricted loader.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={`${company} logo`}
        width={size}
        height={size}
        decoding="async"
        onError={handleError}
        className="shrink-0 rounded-md object-contain bg-white border border-neutral-200 dark:border-neutral-800"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="shrink-0 rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 flex items-center justify-center font-semibold"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden
    >
      {company.trim().charAt(0).toUpperCase() || "?"}
    </div>
  );
}
