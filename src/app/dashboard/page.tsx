import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUserApplications } from "@/lib/applications";
import { getUserDocuments } from "@/lib/documents";
import { filterUpcomingDeadlines } from "@/lib/deadlines";
import { STAGES, STAGE_LABELS } from "@/types/application";
import AddApplicationForm from "./AddApplicationForm";
import ApplicationCard from "./ApplicationCard";

export const dynamic = "force-dynamic";

const UPCOMING_WINDOW_DAYS = 14;

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [applications, documents] = await Promise.all([
    getUserApplications(supabase, user.id),
    getUserDocuments(supabase, user.id),
  ]);

  const upcoming = filterUpcomingDeadlines(applications, UPCOMING_WINDOW_DAYS);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
        Your applications
      </h1>

      {upcoming.length > 0 && (
        <div className="mb-8 rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
          <h2 className="text-sm font-semibold mb-2">
            Upcoming deadlines (next {UPCOMING_WINDOW_DAYS} days)
          </h2>
          <ul className="flex flex-col gap-1 text-sm">
            {upcoming.map((a) => (
              <li key={a.id}>
                <span className="font-medium">{a.company}</span> —{" "}
                {a.role_title} · deadline {a.deadline}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-8">
        <AddApplicationForm />

        {STAGES.map((stage) => {
          const items = applications.filter((a) => a.stage === stage);
          if (items.length === 0) return null;
          return (
            <div key={stage}>
              <h2 className="text-sm font-semibold mb-3">
                {STAGE_LABELS[stage]} ({items.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((a) => (
                  <ApplicationCard
                    key={a.id}
                    application={a}
                    documents={documents}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {applications.length === 0 && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Nothing tracked yet — browse{" "}
            <Link href="/opportunities/2027" className="underline">
              2027 opportunities
            </Link>{" "}
            and hit &quot;Track&quot;, or add one manually above.
          </p>
        )}
      </div>
    </main>
  );
}
