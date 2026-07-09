import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6 sm:py-20">
      <header className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Hublr
        </h1>
        <p className="mt-3 text-lg text-neutral-700 dark:text-neutral-200 max-w-xl mx-auto">
          Helping students and early career professionals secure internships,
          grad roles, and more.
        </p>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
          Browse curated opportunities across the UK, EU, and US, then track
          your applications, deadlines, and documents in one place.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium px-4 py-2 hover:opacity-90"
          >
            Get started
          </Link>
          <Link
            href="/opportunities/2027"
            className="rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-4 py-2"
          >
            Browse opportunities
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/opportunities/2027"
          className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
        >
          <h2 className="text-xl font-semibold">2027 Opportunities</h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Summer internships, off-cycle, spring internships, co-op, and
            grad/full-time-analyst roles for the 2027 cycle.
          </p>
        </Link>

        <Link
          href="/opportunities/2026"
          className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
        >
          <h2 className="text-xl font-semibold">2026 Opportunities</h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            The same tracker for the 2026 cycle.
          </p>
        </Link>
      </div>
    </main>
  );
}
