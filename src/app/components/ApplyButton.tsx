"use client";

import { notifyApplyClick } from "@/lib/apply-tracking";

export default function ApplyButton({
  opportunityId,
  company,
  roleTitle,
  isLoggedIn,
}: {
  opportunityId: string;
  company: string;
  roleTitle: string;
  isLoggedIn: boolean;
}) {
  return (
    <a
      href={`/go/${opportunityId}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        isLoggedIn &&
        notifyApplyClick({ id: opportunityId, company, role_title: roleTitle })
      }
      className="flex-1 inline-flex items-center justify-center rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-3 py-1.5 hover:opacity-90"
    >
      Apply
    </a>
  );
}
