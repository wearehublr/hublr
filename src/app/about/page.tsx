export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
        About Hublr
      </h1>

      <p className="mt-4 text-neutral-700 dark:text-neutral-200">
        Hublr helps students and early career professionals secure
        internships, grad roles, and more — bringing together live
        opportunities, events, interview prep, and your own application
        tracker in one place.
      </p>

      <h2 className="mt-8 text-lg font-semibold">The founder</h2>
      <p className="mt-2 text-neutral-700 dark:text-neutral-200">
        Hublr is built by Muriel Tokam. With experience across financial
        services — from venture capital and HSBC HR to asset management —
        she&apos;s supported 100+ candidates with applications and
        interviews, with clients securing interviews and offers at Goldman
        Sachs, UBS, Amazon, and more.
      </p>

      <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
        Want to talk?{" "}
        <a href="/book" className="underline">
          Book a meeting
        </a>{" "}
        or{" "}
        <a href="/work-with-us" className="underline">
          get in touch
        </a>
        .
      </p>
    </main>
  );
}
