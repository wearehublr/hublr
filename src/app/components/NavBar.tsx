import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth-actions";
import MobileMenu, { type NavLink } from "./MobileMenu";

export default async function NavBar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = !!user && user.email === process.env.ADMIN_EMAIL;

  const links: NavLink[] = [
    { href: "/opportunities", label: "Opportunities" },
    { href: "/events", label: "Events" },
    { href: "/interview-prep", label: "Interview Prep" },
    { href: "/international", label: "International" },
    ...(user ? [{ href: "/dashboard", label: "Applications" }] : []),
    ...(user ? [{ href: "/documents", label: "Documents" }] : []),
    ...(user ? [{ href: "/profile", label: "Profile" }] : []),
    { href: "/book", label: "Book a meeting" },
    ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <nav className="relative mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold whitespace-nowrap">
          <span className="text-brand dark:text-brand-light">Hub</span>
          <span className="text-brand-light dark:text-brand">lr</span>
        </Link>

        <div className="hidden sm:flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap">
              {l.label}
            </Link>
          ))}

          {user ? (
            <form action={signOut}>
              <button
                type="submit"
                className="whitespace-nowrap text-neutral-500 dark:text-neutral-400 hover:underline"
              >
                Sign out
              </button>
            </form>
          ) : (
            <>
              <Link href="/login" className="whitespace-nowrap">
                Log in
              </Link>
              <Link
                href="/signup"
                className="whitespace-nowrap rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 px-3 py-1.5 font-medium"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <MobileMenu links={links} isLoggedIn={!!user} signOutAction={signOut} />
      </nav>
    </header>
  );
}
