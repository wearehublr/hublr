-- Long-form job description text, separate from the short "notes" blurb
-- shown on cards.

alter table public.opportunities
  add column if not exists full_description text;
