import { createClient } from "@/lib/supabase/server";
import { getAllWaitlistSignups } from "@/lib/waitlist-signups";
import AdminSubNav from "../AdminSubNav";
import NotifyButton from "./NotifyButton";
import WaitlistRow from "./WaitlistRow";

export const dynamic = "force-dynamic";

export default async function AdminWaitlistPage() {
  const supabase = await createClient();
  const signups = await getAllWaitlistSignups(supabase);
  const pendingCount = signups.filter((s) => !s.notified_at).length;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <AdminSubNav />
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
        Admin: Launch Waitlist
      </h1>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
        {signups.length} total &middot; {pendingCount} not yet notified
      </p>

      <div className="mb-8">
        <NotifyButton pendingCount={pendingCount} />
      </div>

      <div className="flex flex-col gap-3">
        {signups.map((s) => (
          <WaitlistRow key={s.id} signup={s} />
        ))}
        {signups.length === 0 && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No signups yet.
          </p>
        )}
      </div>
    </main>
  );
}
