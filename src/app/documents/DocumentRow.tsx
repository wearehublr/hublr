"use client";

import { useTransition } from "react";
import type { Document } from "@/types/document";
import { DOC_TYPE_LABELS } from "@/types/document";
import { getDownloadUrl, deleteDocument } from "./actions";

function formatSize(bytes: number | null): string {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentRow({ document }: { document: Document }) {
  const [isPending, startTransition] = useTransition();

  function handleDownload() {
    startTransition(async () => {
      const url = await getDownloadUrl(document.id);
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  function handleDelete() {
    if (!confirm(`Delete "${document.label}"?`)) return;
    startTransition(() => deleteDocument(document.id));
  }

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="font-medium truncate">{document.label}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {DOC_TYPE_LABELS[document.doc_type]} · {document.file_name}
          {document.size_bytes ? ` · ${formatSize(document.size_bytes)}` : ""}
        </p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={handleDownload}
          disabled={isPending}
          className="rounded-md border border-neutral-300 dark:border-neutral-700 text-xs font-medium px-2.5 py-1.5 disabled:opacity-50"
        >
          Get link
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-md border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-medium px-2.5 py-1.5 disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
