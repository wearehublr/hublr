import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth-actions";
import MobileMenu, { type NavLink } from "./MobileMenu";
import Logo from "./Logo";

// A transient Supabase gateway failure here must not take down every page on
// the site - NavBar renders in the root layout above {children}, so an
// uncaught throw here crashes whatever route the visitor is on. Falling back
// to "logged out" for that one render is a much smaller cost than a hard
// crash on /signup or the homepage.
async function getCurrentUser(supabase: Awaited<ReturnType<typeof createClient>>) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    Sentry.captureException(error, { tags: { source: "navbar-get-user" } });
    return null;
  }
}

export default async function NavBar() {
  const supabase = await createClient();
  const user = await getCurrentUser(supabase);
  const isAdmin = !!user && user.email === process.env.ADMIN_EMAIL;

  const links: NavLink[] = [
    { href: "/opportunities", label: "Opportunities" },
    { href: "/events", label: "Events" },
    { href: "/interview-prep", label: "Interview Prep" },
    { href: "/international", label: "International" },
    { href: "/newsletter", label: "Newsletter" },
    ...(user ? [{ href: "/", label: "Dashboard" }] : []),
    ...(user ? [{ href: "/dashboard", label: "Applications" }] : []),
    ...(user ? [{ href: "/documents", label: "Documents" }] : []),
    ...(user ? [{ href: "/profile", label: "Profile" }] : []),
    { href: "/book", label: "Book a meeting" },
    ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <nav className="relative mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold whitespace-nowrap"
        >
          <span className="text-brand dark:text-brand-light">
            <Logo size={26} />
          </span>
          <span>
            <span className="text-brand dark:text-brand-light">Hub</span>
            <span className="text-brand-light dark:text-brand">lr</span>
          </span>
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
