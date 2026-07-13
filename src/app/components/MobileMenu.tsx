"use client";

import { useState } from "react";
import Link from "next/link";

export type NavLink = { href: string; label: string };

export default function MobileMenu({
  links,
  isLoggedIn,
  signOutAction,
}: {
  links: NavLink[];
  isLoggedIn: boolean;
  signOutAction: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="p-2 -mr-2"
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
            />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-40 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 flex flex-col gap-1 text-sm shadow-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2"
            >
              {l.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <form action={signOutAction}>
              <button
                type="submit"
                className="py-2 text-left w-full text-neutral-500 dark:text-neutral-400"
              >
                Sign out
              </button>
            </form>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)} className="py-2">
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center justify-center rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 px-3 py-2 font-medium"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
