import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth-actions";

export default async function NavBar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = !!user && user.email === process.env.ADMIN_EMAIL;

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <Link
          href="/"
          className="font-semibold whitespace-nowrap text-brand dark:text-brand-light"
        >
          Hublr
        </Link>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <Link href="/opportunities/2027" className="whitespace-nowrap">
            Opportunities
          </Link>
          <Link href="/events" className="whitespace-nowrap">
            Events
          </Link>
          <Link href="/interview-prep" className="whitespace-nowrap">
            Interview Prep
          </Link>
          <Link href="/international" className="whitespace-nowrap">
            International
          </Link>
          {user && (
            <Link href="/dashboard" className="whitespace-nowrap">
              Applications
            </Link>
          )}
          {user && (
            <Link href="/documents" className="whitespace-nowrap">
              Documents
            </Link>
          )}
          {user && (
            <Link href="/profile" className="whitespace-nowrap">
              Profile
            </Link>
          )}
          <Link href="/book" className="whitespace-nowrap">
            Book a meeting
          </Link>
          {isAdmin && (
            <Link href="/admin" className="whitespace-nowrap">
              Admin
            </Link>
          )}

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
      </nav>
    </header>
  );
}
