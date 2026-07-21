-- Events now carry the same "who's running this" identity as
-- opportunities: a company name, a logo, and an optional application
-- deadline separate from the event date itself.

alter table public.events
  add column if not exists company text,
  add column if not exists logo_url text,
  add column if not exists deadline date;
