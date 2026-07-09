import { createClient } from "@/lib/supabase/server";
import { getUserDocuments } from "@/lib/documents";
import UploadForm from "./UploadForm";
import DocumentRow from "./DocumentRow";

export const dynamic = "force-dynamic";

export default async function DocumentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const documents = await getUserDocuments(supabase, user.id);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
        Your documents
      </h1>

      <div className="flex flex-col gap-8">
        <UploadForm />

        <div className="flex flex-col gap-3">
          {documents.map((d) => (
            <DocumentRow key={d.id} document={d} />
          ))}
          {documents.length === 0 && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              No documents yet — upload a CV or cover letter above.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
