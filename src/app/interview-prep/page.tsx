import { createClient } from "@/lib/supabase/server";
import { getPublishedInterviewResources } from "@/lib/interview-resources";
import { RESOURCE_TYPE_LABELS } from "@/types/interview-resource";

export const dynamic = "force-dynamic";

export default async function InterviewPrepPage() {
  const supabase = await createClient();
  const resources = await getPublishedInterviewResources(supabase);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Interview Prep
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Guides and newsletter resources to help you prepare for
          interviews.
        </p>
      </header>

      {resources.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 py-12 text-center">
          Nothing published yet — check back soon.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resources.map((r) => (
            <li
              key={r.id}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 flex flex-col gap-2 bg-white dark:bg-neutral-900"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold leading-tight">{r.title}</p>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.is_paid
                      ? "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300"
                      : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300"
                  }`}
                >
                  {r.is_paid ? r.price_label || "Paid" : "Free"}
                </span>
              </div>

              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {RESOURCE_TYPE_LABELS[r.resource_type]}
              </span>

              {r.description && (
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {r.description}
                </p>
              )}

              <a
                href={r.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium px-3 py-1.5 hover:opacity-90"
              >
                {r.is_paid ? "View guide" : "Read"}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
