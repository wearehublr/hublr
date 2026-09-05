"use client";

import { useTransition } from "react";
import { markEventRegistered } from "@/app/events/actions";

export default function RegisterButton({
  eventId,
  registrationUrl,
  isLoggedIn,
  className,
}: {
  eventId: string;
  registrationUrl: string;
  isLoggedIn: boolean;
  className: string;
}) {
  const [, startTransition] = useTransition();

  if (!isLoggedIn) {
    return (
      <a
        href="/login?next=/events"
        className={`${className} border border-neutral-300 dark:border-neutral-700`}
      >
        Log in to register
      </a>
    );
  }

  return (
    <a
      href={registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => startTransition(() => markEventRegistered(eventId))}
      className={`${className} bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 hover:opacity-90`}
    >
      Register
    </a>
  );
}
