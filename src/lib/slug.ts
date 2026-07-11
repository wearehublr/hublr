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

export function opportunityIdFromSlug(slug: string): string {
  return slug.split("--").pop() ?? slug;
}
