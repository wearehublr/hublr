export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildOpportunitySlug(
  opportunity: { id: string; company: string; role_title: string },
): string {
  return `${slugify(`${opportunity.company} ${opportunity.role_title}`)}--${opportunity.id}`;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Returns null for a malformed slug (stale link, bot-crawled garbage URL,
// etc.) instead of handing an invalid id to a uuid column - Postgres throws
// 22P02 for that rather than returning no rows, which otherwise crashes the
// page instead of showing a normal 404.
export function opportunityIdFromSlug(slug: string): string | null {
  const id = slug.split("--").pop() ?? slug;
  return UUID_RE.test(id) ? id : null;
}

export function buildEventSlug(
  event: { id: string; company: string | null; title: string },
): string {
  return `${slugify(`${event.company ?? ""} ${event.title}`)}--${event.id}`;
}

export function eventIdFromSlug(slug: string): string | null {
  const id = slug.split("--").pop() ?? slug;
  return UUID_RE.test(id) ? id : null;
}
