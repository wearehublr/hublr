alter table public.profiles
  add column if not exists last_match_digest_sent_at timestamptz;
