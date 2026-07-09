export default function BookPage() {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/murielltokam";

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Book a meeting
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
          Pick a time that works for you.
        </p>
      </header>

      <iframe
        src={calendlyUrl}
        title="Book a meeting"
        width="100%"
        height={700}
        className="rounded-lg border border-neutral-200 dark:border-neutral-800"
      />
    </main>
  );
}
