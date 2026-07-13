import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/profiles";
import ProfileForm from "./ProfileForm";
import DeleteAccountSection from "./DeleteAccountSection";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = user ? await getProfile(supabase, user.id) : null;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
        Your profile
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-8">
        Tell us a bit about yourself so we can point you to the right
        opportunities.
      </p>

      <ProfileForm profile={profile} />
      <DeleteAccountSection />
    </main>
  );
}
