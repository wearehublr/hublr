import { redirect } from "next/navigation";
import WaitlistForm from "./WaitlistForm";
import Logo from "@/app/components/Logo";
import { isPreLaunch } from "@/lib/launch-status";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Join the waitlist | Hublr",
};

export default function WaitlistPage() {
  // Once launched, this link may still be shared/bookmarked from before -
  // send people to the real signup instead of asking them to join a
  // waitlist for a site that's already live.
  if (!isPreLaunch()) {
    redirect("/signup");
  }

  return (
    <main className="flex-1">
      <div className="relative overflow-hidden bg-cream dark:bg-cream-dark border-b border-brand-light/40 dark:border-brand/40">
        <Logo
          className="pointer-events-none select-none absolute right-[-2rem] top-1/2 -translate-y-1/2 w-[22rem] sm:w-[28rem] h-auto text-brand/10 dark:text-brand-light/10"
        />

        <section className="relative mx-auto w-full max-w-lg px-4 py-16 sm:px-6 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Hublr is almost here
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-medium text-neutral-700 dark:text-neutral-200">
            Your entire job search, in one place.
          </p>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Live internships, off-cycle, and grad roles across the UK, EU,
            and US, with clear visa sponsorship info, application tracking,
            deadline reminders, and interview prep. Join the waitlist and
            we&apos;ll email you the moment it opens.
          </p>

          <div className="mt-8">
            <WaitlistForm />
          </div>
        </section>
      </div>
    </main>
  );
}
