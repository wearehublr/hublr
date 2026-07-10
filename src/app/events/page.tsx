import { createClient } from "@/lib/supabase/server";
import { getPublishedEvents } from "@/lib/events";
import EventBrowser from "@/app/components/EventBrowser";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const supabase = await createClient();
  const events = await getPublishedEvents(supabase);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Events
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Early career and networking events: workshops, panels, career
          fairs, and more.
        </p>
      </header>

      <EventBrowser events={events} />
    </main>
  );
}
