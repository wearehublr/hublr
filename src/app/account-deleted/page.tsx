import Link from "next/link";

export default function AccountDeletedPage() {
  return (
    <main className="mx-auto w-full max-w-md flex-1 px-4 py-16 sm:py-24 text-center">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
        Your account has been deleted
      </h1>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
        Your profile, tracked applications, uploaded documents, and job
        alerts have all been permanently removed. You&apos;re welcome to{" "}
        <Link href="/signup" className="underline">
          sign up again
        </Link>{" "}
        anytime.
      </p>
    </main>
  );
}
