import { createClient } from "@/lib/supabase/server";
import { getUserDocuments } from "@/lib/documents";
import type { Document, DocType } from "@/types/document";
import UploadForm from "./UploadForm";
import DocumentRow from "./DocumentRow";

export const dynamic = "force-dynamic";

function DocumentSection({
  title,
  emptyHint,
  documents,
}: {
  title: string;
  emptyHint: string;
  documents: Document[];
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold mb-3">
        {title} ({documents.length})
      </h2>
      <div className="flex flex-col gap-3">
        {documents.map((d) => (
          <DocumentRow key={d.id} document={d} />
        ))}
        {documents.length === 0 && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {emptyHint}
          </p>
        )}
      </div>
    </div>
  );
}

export default async function DocumentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const documents = await getUserDocuments(supabase, user.id);
  const byType = (type: DocType) => documents.filter((d) => d.doc_type === type);
  const other = byType("other");

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
        Your documents
      </h1>

      <div className="flex flex-col gap-8">
        <UploadForm />

        <DocumentSection
          title="CVs"
          emptyHint="No CVs yet — upload one above."
          documents={byType("cv")}
        />
        <DocumentSection
          title="Cover Letters"
          emptyHint="No cover letters yet — upload one above."
          documents={byType("cover_letter")}
        />
        {other.length > 0 && (
          <DocumentSection title="Other" emptyHint="" documents={other} />
        )}
      </div>
    </main>
  );
}
