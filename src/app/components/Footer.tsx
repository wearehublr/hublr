import Link from "next/link";

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/thejobseekerhub/",
    icon: (
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.12 4.98 3.5ZM.24 8.24h4.48V23H.24V8.24ZM8.24 8.24h4.29v2.01h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.37 2.98 5.37 6.86V23h-4.47v-6.36c0-1.52-.03-3.47-2.11-3.47-2.12 0-2.44 1.65-2.44 3.36V23H8.24V8.24Z" />
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/wearehublr?igsh=amZrdTZua3czeGd0&utm_source=qr",
    icon: (
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.05-.41-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56a5.9 5.9 0 0 0-2.14 1.4A5.9 5.9 0 0 0 .6 4.17c-.3.76-.5 1.63-.56 2.91C.01 8.36 0 8.77 0 12s.01 3.64.07 4.92c.06 1.28.26 2.15.56 2.91.3.79.71 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.76.3 1.63.5 2.91.56C8.36 23.99 8.77 24 12 24s3.64-.01 4.92-.07c1.28-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.92s-.01-3.64-.07-4.92c-.06-1.28-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.14A5.9 5.9 0 0 0 19.83.63c-.76-.3-1.63-.5-2.91-.56C15.64.01 15.23 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.4-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44Z" />
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@wearehublr?_r=1&_t=ZN-97v1Eh1AoC6",
    icon: (
      <path d="M16.6 0h-3.3v16.3a3.4 3.4 0 1 1-2.4-3.26V9.7a6.7 6.7 0 1 0 5.7 6.6V8.1a8.2 8.2 0 0 0 4.9 1.6V6.4a4.9 4.9 0 0 1-4.9-4.9V0Z" />
    ),
  },
];

const FOOTER_LINKS = [
  { href: "/about", label: "About us" },
  { href: "/work-with-us", label: "Work with us" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

function currentYear() {
  return new Date().getFullYear();
}

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-auto">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 flex flex-col items-center gap-6">
        <div className="flex gap-4">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="text-neutral-500 dark:text-neutral-400 hover:text-brand dark:hover:text-brand-light transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                {social.icon}
              </svg>
            </a>
          ))}
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          © {currentYear()} Hublr
        </p>
      </div>
    </footer>
  );
}
