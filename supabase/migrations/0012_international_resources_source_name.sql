-- Resources are now shown as in-house, original summaries rather than
-- outbound links. link_url is kept for admin's own reference only; the
-- public page now shows a plain-text source_name (e.g. "GOV.UK", "UKCISA")
-- instead of a clickable "Read" button.

alter table public.international_resources
  add column if not exists source_name text;
