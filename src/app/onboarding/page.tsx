import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/profiles";
import OnboardingForm from "./OnboardingForm";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next: rawNext } = await searchParams;
  const next = rawNext && rawNext.startsWith("/") ? rawNext : "/opportunities";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/onboarding?next=${next}`)}`);

  const profile = await getProfile(supabase, user.id);
  if (profile?.onboarding_completed_at) redirect(next);

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          A few quick questions
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          This takes 30 seconds and lets us pre-filter opportunities to what
          you&apos;re actually looking for. You can change any of this later
          in your profile.
        </p>
      </header>

      <OnboardingForm profile={profile} next={next} />
    </main>
  );
}
