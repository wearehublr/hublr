import Link from "next/link";

const LINKS = [
  { href: "/admin", label: "Opportunities" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/interview-prep", label: "Interview Prep" },
];

export default function AdminSubNav() {
  return (
    <nav className="mb-6 flex gap-4 text-sm border-b border-neutral-200 dark:border-neutral-800 pb-3">
      {LINKS.map((link) => (
        <Link key={link.href} href={link.href} className="hover:underline">
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
