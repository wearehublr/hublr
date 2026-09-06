-- Lets the founder tag newsletter articles by topic so /newsletter can
-- filter by "what are you looking for" the same way /interview-prep does.
-- Nullable, no default: existing untagged articles fall under "General"
-- in the UI until tagged.

alter table public.newsletter_articles
  add column if not exists topic text check (
    topic in ('hirevue', 'assessment_centre', 'hr_interview', 'cv', 'cover_letter', 'general')
  );
