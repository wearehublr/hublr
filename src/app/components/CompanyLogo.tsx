"use client";

import { useState } from "react";

export default function CompanyLogo({
  company,
  logoUrl,
  size = 40,
}: {
  company: string;
  logoUrl: string | null;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);

  if (logoUrl && !failed) {
    return (
      // Arbitrary admin-pasted external URLs can't use next/image's
      // domain-restricted loader.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={`${company} logo`}
        width={size}
        height={size}
        onError={() => setFailed(true)}
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
