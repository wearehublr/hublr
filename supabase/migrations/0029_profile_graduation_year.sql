-- Anticipated graduation year, used to help match students to the right
-- cycle_year opportunities.

alter table public.profiles
  add column if not exists graduation_year integer;
