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
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold whitespace-nowrap">
          Hublr
        </Link>

        <div className="flex items-center gap-4 text-sm overflow-x-auto">
          <Link href="/opportunities/2027" className="whitespace-nowrap">
            2027
          </Link>
          <Link href="/opportunities/2026" className="whitespace-nowrap">
            2026
          </Link>
          {user && (
            <Link href="/dashboard" className="whitespace-nowrap">
              Dashboard
            </Link>
          )}
          {user && (
            <Link href="/documents" className="whitespace-nowrap">
              Documents
            </Link>
          )}
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
                className="whitespace-nowrap rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-3 py-1.5 font-medium"
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
