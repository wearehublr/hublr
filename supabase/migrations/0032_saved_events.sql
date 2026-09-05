-- Per-user event tracking, mirroring how `applications` tracks opportunities.
-- status starts at 'interested' when a user saves an event, and upgrades to
-- 'registered' when they click through to the actual registration link.

create table if not exists public.saved_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  event_id uuid not null references public.events (id) on delete cascade,
  status text not null default 'interested' check (status in ('interested', 'registered')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, event_id)
);

drop trigger if exists saved_events_set_updated_at on public.saved_events;
create trigger saved_events_set_updated_at
  before update on public.saved_events
  for each row
  execute function public.set_updated_at();

alter table public.saved_events enable row level security;

drop policy if exists "Users manage their own saved events" on public.saved_events;
create policy "Users manage their own saved events"
  on public.saved_events
  for all
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
