import Link from "next/link";
import type { Testimonial } from "@/types/testimonial";
import type { NewsletterArticle } from "@/types/newsletter-article";

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

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function MarketingHome({
  opportunitiesCount,
  eventsCount,
  testimonials,
  articles,
}: {
  opportunitiesCount: number;
  eventsCount: number;
  testimonials: Testimonial[];
  articles: NewsletterArticle[];
}) {
  return (
    <main className="flex-1">
      <div className="relative overflow-hidden bg-cream dark:bg-cream-dark border-b border-brand-light/40 dark:border-brand/40">
        <span
          aria-hidden
          className="pointer-events-none select-none absolute right-[-0.05em] top-1/2 -translate-y-1/2 text-[26rem] sm:text-[32rem] font-black leading-none text-brand/10 dark:text-brand-light/10"
        >
          H
        </span>

        <section className="relative mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Hublr
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-medium text-neutral-700 dark:text-neutral-200 max-w-xl mx-auto">
            Helping students and early career professionals secure
            internships, grad roles, and more.
          </p>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            Browse curated opportunities across the UK, EU, and US, then
            track your applications, deadlines, and documents in one place.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/signup"
              className="rounded-full bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-semibold px-6 py-3 hover:opacity-90"
            >
              Sign up to get started
            </Link>
            <Link
              href="/opportunities/2027"
              className="rounded-full border border-brand/30 dark:border-brand-light/30 bg-white/60 dark:bg-neutral-900/40 text-sm font-semibold px-6 py-3"
            >
              Browse opportunities
            </Link>
          </div>
        </section>
      </div>

      <section className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 flex flex-col sm:flex-row items-center gap-8 sm:gap-16">
          <div className="flex gap-10">
            <div>
              <p className="text-3xl font-bold tracking-tight">
                {opportunitiesCount}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                live opportunities
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight">
                {eventsCount}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                upcoming events
              </p>
            </div>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-sm">
            All the best internships, grad schemes, and early career events
            in one place — we do the searching, you do the applying.
          </p>
        </div>
      </section>

      <section className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-8">
            How it works
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <span className="text-2xl font-bold text-brand-light dark:text-brand">
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

      <section className="border-b border-neutral-200 dark:border-neutral-800">
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

      {testimonials.length > 0 && (
        <section className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-8">
              In Their Shoes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-5"
                >
                  <div className="flex items-center gap-3">
                    {t.photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={t.photo_url}
                        alt={t.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light/40 dark:bg-brand/40 text-sm font-semibold text-brand dark:text-brand-light">
                        {initials(t.name)}
                      </span>
                    )}
                    <div>
                      <p className="font-semibold leading-tight">{t.name}</p>
                      {t.subtitle && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {t.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                    {t.story}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-8">
              Get the latest
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {articles.map((a) => (
                <a
                  key={a.id}
                  href={a.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <span className="block h-1 w-10 bg-brand-light dark:bg-brand mb-3" />
                  <h3 className="font-semibold group-hover:underline">
                    {a.title}
                  </h3>
                  {a.description && (
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      {a.description}
                    </p>
                  )}
                  {a.published_date && (
                    <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
                      {new Date(a.published_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 text-center">
          <h2 className="text-xl font-semibold">Ready to get started?</h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            It&apos;s free — sign up and start tracking in a couple of minutes.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex rounded-full bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-semibold px-6 py-3 hover:opacity-90"
            >
              Get started
            </Link>
            <Link
              href="/work-with-us"
              className="inline-flex rounded-full border border-brand/30 dark:border-brand-light/30 text-sm font-semibold px-6 py-3"
            >
              Work with us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
