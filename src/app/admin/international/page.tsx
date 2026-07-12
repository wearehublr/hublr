import { createClient } from "@/lib/supabase/server";
import { getAllInternationalResources } from "@/lib/international-resources";
import AdminSubNav from "../AdminSubNav";
import QuickAddForm from "./QuickAddForm";
import AdminResourceRow from "./AdminResourceRow";

export const dynamic = "force-dynamic";

export default async function AdminInternationalPage() {
  const supabase = await createClient();
  const resources = await getAllInternationalResources(supabase);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <AdminSubNav />
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
        Admin: International Resources
      </h1>

      <div className="flex flex-col gap-8">
        <QuickAddForm />

        <div>
          <h2 className="text-sm font-semibold mb-3">
            All resources ({resources.length})
          </h2>
          <div className="flex flex-col gap-3">
            {resources.map((r) => (
              <AdminResourceRow key={r.id} resource={r} />
            ))}
            {resources.length === 0 && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No resources yet. Add one above.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
