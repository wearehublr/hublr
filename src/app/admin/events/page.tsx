import { createClient } from "@/lib/supabase/server";
import { getAllEvents } from "@/lib/events";
import AdminSubNav from "../AdminSubNav";
import QuickAddForm from "./QuickAddForm";
import AdminEventRow from "./AdminEventRow";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const supabase = await createClient();
  const events = await getAllEvents(supabase);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <AdminSubNav />
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
        Admin — Events
      </h1>

      <div className="flex flex-col gap-8">
        <QuickAddForm />

        <div>
          <h2 className="text-sm font-semibold mb-3">
            All events ({events.length})
          </h2>
          <div className="flex flex-col gap-3">
            {events.map((e) => (
              <AdminEventRow key={e.id} event={e} />
            ))}
            {events.length === 0 && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No events yet — add one above.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
