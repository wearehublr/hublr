-- Optional dates admins can fill in when they have them. Nullable, so
-- rows without a value simply don't show anything on the public site.

alter table public.opportunities
  add column if not exists start_date date,
  add column if not exists posted_date date;
