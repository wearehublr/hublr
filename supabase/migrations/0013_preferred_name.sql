-- Preferred name shown across the site and used in email greetings.

alter table public.profiles
  add column if not exists preferred_name text;
