-- Job alerts: a saved filter that emails the student when a new matching
-- opportunity is published.

create table if not exists public.saved_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  label text not null,
  region text,
  category text,
  visa_sponsorship text,
  industry text,
  keyword text,
  created_at timestamptz not null default now(),
  last_notified_at timestamptz
);

create index if not exists saved_searches_user_id_idx on public.saved_searches (user_id);

alter table public.saved_searches enable row level security;

drop policy if exists "Users manage their own saved searches" on public.saved_searches;
create policy "Users manage their own saved searches"
  on public.saved_searches
  for all
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
