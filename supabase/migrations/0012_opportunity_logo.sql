-- Company logo image URL, shown on opportunity cards and detail pages.

alter table public.opportunities
  add column if not exists logo_url text;
