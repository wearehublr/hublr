import { createClient } from "@/lib/supabase/server";
import { getAllContactSubmissions } from "@/lib/contact-submissions";
import AdminSubNav from "../AdminSubNav";
import SubmissionRow from "./SubmissionRow";

export const dynamic = "force-dynamic";

export default async function AdminContactSubmissionsPage() {
  const supabase = await createClient();
  const submissions = await getAllContactSubmissions(supabase);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <AdminSubNav />
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
        Admin — Work With Us Submissions
      </h1>

      <div className="flex flex-col gap-3">
        {submissions.map((s) => (
          <SubmissionRow key={s.id} submission={s} />
        ))}
        {submissions.length === 0 && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No submissions yet.
          </p>
        )}
      </div>
    </main>
  );
}
