import Link from "next/link";

const STEPS = [
  {
    title: "Sign up",
    description: "Create a free account in seconds.",
  },
  {
    title: "Browse & track",
    description:
      "See live opportunities and events, and track the ones you apply to.",
  },
  {
    title: "Prepare & land the role",
    description:
      "Use interview prep resources and keep your CV/cover letters ready to go.",
  },
];

const FEATURES = [
  {
    title: "Opportunities Tracker",
    description:
      "See which internships, off-cycle, grad schemes and more are live right now, and their deadlines, across the UK, EU, and US.",
    href: "/opportunities/2027",
  },
  {
    title: "Event Tracker",
    description:
      "Early career and networking events — workshops, panels, career fairs, and more.",
    href: "/events",
  },
  {
    title: "Interview Prep",
    description:
      "Guides and newsletter resources to help you walk into interviews prepared.",
    href: "/interview-prep",
  },
  {
    title: "Application Tracker",
    description:
      "Track where you've applied, what stage you're at, and upcoming deadlines.",
    href: "/dashboard",
  },
  {
    title: "Documents",
    description:
      "Store and manage your CVs and cover letters, and attach the right version to each application.",
    href: "/documents",
  },
];

export default function MarketingHome() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-24 text-center">
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
      </section>

      <section className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-8">
            How it works
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <span className="text-2xl font-bold text-neutral-300 dark:text-neutral-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
            Everything in one place
          </h2>
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {FEATURES.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="flex flex-col sm:flex-row sm:items-baseline sm:gap-6 py-6 group"
              >
                <h3 className="font-semibold sm:w-56 shrink-0 group-hover:underline">
                  {feature.title}
                </h3>
                <p className="mt-1 sm:mt-0 text-sm text-neutral-500 dark:text-neutral-400">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 text-center">
          <h2 className="text-xl font-semibold">Ready to get started?</h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            It&apos;s free — sign up and start tracking in a couple of minutes.
          </p>
          <Link
            href="/signup"
            className="mt-5 inline-flex rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium px-4 py-2 hover:opacity-90"
          >
            Get started
          </Link>
        </div>
      </section>
    </main>
  );
}
