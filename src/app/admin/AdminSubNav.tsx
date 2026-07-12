import Link from "next/link";

const LINKS = [
  { href: "/admin", label: "Opportunities" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/interview-prep", label: "Interview Prep" },
  { href: "/admin/international", label: "International" },
  { href: "/admin/testimonials", label: "In Their Shoes" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/contact-submissions", label: "Work With Us Submissions" },
  { href: "/admin/metrics", label: "Metrics" },
];

export default function AdminSubNav() {
  return (
    <nav className="mb-6 flex flex-wrap gap-4 text-sm border-b border-neutral-200 dark:border-neutral-800 pb-3">
      {LINKS.map((link) => (
        <Link key={link.href} href={link.href} className="hover:underline">
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
