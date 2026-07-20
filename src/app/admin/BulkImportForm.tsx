"use client";

import { useMemo, useState } from "react";
import {
  CATEGORIES,
  REGIONS,
  STATUSES,
  VISA_SPONSORSHIP_OPTIONS,
  type Category,
  type Region,
  type Status,
  type VisaSponsorship,
} from "@/types/opportunity";
import { bulkAddOpportunities, type BulkOpportunityRow } from "./actions";

const REQUIRED_FIELDS = ["company", "role_title", "category", "region", "apply_url"];

const RECOGNIZED_FIELDS = [
  "company",
  "role_title",
  "category",
  "region",
  "apply_url",
  "cycle_year",
  "status",
  "visa_sponsorship",
  "deadline",
  "open_date",
  "posted_date",
  "start_date",
  "city",
  "country",
  "industry",
  "notes",
  "full_description",
  "source_url",
  "logo_url",
];

const EXAMPLE = `company\trole_title\tcategory\tregion\tapply_url\tcity\tcountry\tvisa_sponsorship
Acme Capital\tOff-Cycle Analyst\toff_cycle\tuk\thttps://acme.com/apply\tLondon\tUnited Kingdom\tunknown`;

type ParsedRow = {
  raw: Record<string, string>;
  errors: string[];
};

function detectDelimiter(headerLine: string): string {
  return headerLine.includes("\t") ? "\t" : ",";
}

function parseInput(text: string): {
  rows: ParsedRow[];
  unknownHeaders: string[];
} {
  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length < 2) return { rows: [], unknownHeaders: [] };

  const delimiter = detectDelimiter(lines[0]);
  const headers = lines[0]
    .split(delimiter)
    .map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
  const unknownHeaders = headers.filter((h) => !RECOGNIZED_FIELDS.includes(h));

  const rows = lines.slice(1).map((line) => {
    const cells = line.split(delimiter);
    const raw: Record<string, string> = {};
    headers.forEach((h, i) => {
      raw[h] = (cells[i] ?? "").trim();
    });

    const errors: string[] = [];
    for (const field of REQUIRED_FIELDS) {
      if (!raw[field]) errors.push(`Missing ${field}`);
    }
    if (raw.category && !CATEGORIES.includes(raw.category as Category)) {
      errors.push(`Invalid category "${raw.category}"`);
    }
    if (raw.region && !REGIONS.includes(raw.region as Region)) {
      errors.push(`Invalid region "${raw.region}"`);
    }
    if (
      raw.visa_sponsorship &&
      !VISA_SPONSORSHIP_OPTIONS.includes(raw.visa_sponsorship as VisaSponsorship)
    ) {
      errors.push(`Invalid visa_sponsorship "${raw.visa_sponsorship}"`);
    }
    if (raw.status && !STATUSES.includes(raw.status as Status)) {
      errors.push(`Invalid status "${raw.status}"`);
    }

    return { raw, errors };
  });

  return { rows, unknownHeaders };
}

function toBulkRow(raw: Record<string, string>): BulkOpportunityRow {
  return {
    company: raw.company,
    role_title: raw.role_title,
    category: raw.category as Category,
    region: raw.region as Region,
    apply_url: raw.apply_url,
    cycle_year: raw.cycle_year ? Number(raw.cycle_year) : undefined,
    status: (raw.status as Status) || undefined,
    visa_sponsorship: (raw.visa_sponsorship as VisaSponsorship) || undefined,
    deadline: raw.deadline || null,
    open_date: raw.open_date || null,
    posted_date: raw.posted_date || null,
    start_date: raw.start_date || null,
    city: raw.city || null,
    country: raw.country || null,
    industry: raw.industry || null,
    notes: raw.notes || null,
    full_description: raw.full_description || null,
    source_url: raw.source_url || null,
    logo_url: raw.logo_url || null,
  };
}

export default function BulkImportForm() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState<ParsedRow[] | null>(null);
  const [unknownHeaders, setUnknownHeaders] = useState<string[]>([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ inserted: number; error: string | null } | null>(null);

  const validRows = useMemo(
    () => (parsed ?? []).filter((r) => r.errors.length === 0),
    [parsed],
  );

  function handleParse() {
    const { rows, unknownHeaders } = parseInput(text);
    setParsed(rows);
    setUnknownHeaders(unknownHeaders);
    setResult(null);
  }

  async function handleImport() {
    setImporting(true);
    const res = await bulkAddOpportunities(validRows.map((r) => toBulkRow(r.raw)));
    setImporting(false);
    setResult(res);
    if (!res.error) {
      setText("");
      setParsed(null);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="self-start rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-2"
      >
        Bulk import opportunities
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Bulk import opportunities</h2>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-neutral-500 dark:text-neutral-400 hover:underline"
        >
          Close
        </button>
      </div>

      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Paste rows copied from a spreadsheet (or comma-separated text) with a
        header row. Required columns: <code>company</code>,{" "}
        <code>role_title</code>, <code>category</code>, <code>region</code>,{" "}
        <code>apply_url</code>. Optional: <code>cycle_year</code>,{" "}
        <code>status</code>, <code>visa_sponsorship</code>,{" "}
        <code>deadline</code>, <code>open_date</code>,{" "}
        <code>posted_date</code>, <code>start_date</code>,{" "}
        <code>city</code>,{" "}
        <code>country</code>, <code>industry</code>, <code>notes</code>,{" "}
        <code>full_description</code>, <code>source_url</code>,{" "}
        <code>logo_url</code>.
      </p>

      <details className="text-xs text-neutral-500 dark:text-neutral-400">
        <summary className="cursor-pointer">Show example</summary>
        <pre className="mt-2 overflow-x-auto rounded-md bg-neutral-100 dark:bg-neutral-800 p-2">
          {EXAMPLE}
        </pre>
      </details>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Paste your spreadsheet rows here..."
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm font-mono"
      />

      <button
        type="button"
        onClick={handleParse}
        disabled={!text.trim()}
        className="self-start rounded-md border border-neutral-300 dark:border-neutral-700 text-sm font-medium px-3 py-2 disabled:opacity-50"
      >
        Preview
      </button>

      {unknownHeaders.length > 0 && (
        <p className="text-xs text-amber-600 dark:text-amber-400">
          Unrecognized column{unknownHeaders.length > 1 ? "s" : ""} ignored:{" "}
          {unknownHeaders.join(", ")}
        </p>
      )}

      {parsed && (
        <div className="flex flex-col gap-2">
          <p className="text-sm">
            {validRows.length} of {parsed.length} rows are valid.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="text-left border-b border-neutral-200 dark:border-neutral-800">
                  <th className="py-1 pr-3">Company</th>
                  <th className="py-1 pr-3">Role</th>
                  <th className="py-1 pr-3">Category</th>
                  <th className="py-1 pr-3">Region</th>
                  <th className="py-1 pr-3">Issues</th>
                </tr>
              </thead>
              <tbody>
                {parsed.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-neutral-100 dark:border-neutral-900 ${
                      row.errors.length > 0
                        ? "bg-red-50 dark:bg-red-950/30"
                        : ""
                    }`}
                  >
                    <td className="py-1 pr-3">{row.raw.company}</td>
                    <td className="py-1 pr-3">{row.raw.role_title}</td>
                    <td className="py-1 pr-3">{row.raw.category}</td>
                    <td className="py-1 pr-3">{row.raw.region}</td>
                    <td className="py-1 pr-3 text-red-600 dark:text-red-400">
                      {row.errors.join("; ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={handleImport}
            disabled={importing || validRows.length === 0}
            className="self-start rounded-md bg-brand dark:bg-brand-light text-cream dark:text-neutral-900 text-sm font-medium px-4 py-2 hover:opacity-90 disabled:opacity-50"
          >
            {importing ? "Importing..." : `Import ${validRows.length} valid rows`}
          </button>
        </div>
      )}

      {result?.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{result.error}</p>
      )}
      {result && !result.error && (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">
          Imported {result.inserted} opportunities.
        </p>
      )}
    </div>
  );
}
