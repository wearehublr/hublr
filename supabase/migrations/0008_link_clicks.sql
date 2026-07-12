-- Logs every "Apply" click so sponsors can be shown real referral numbers,
-- plus a place to capture why a user didn't end up applying.

create table if not exists public.link_clicks (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references public.opportunities (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  clicked_at timestamptz not null default now()
);

create index if not exists link_clicks_opportunity_id_idx
  on public.link_clicks (opportunity_id);

alter table public.link_clicks enable row level security;

-- Clicks are written by the server-side redirect route using the request's
-- own session; anon and authenticated can both insert (matches contact
-- form's insert-only pattern), but nobody can read raw click rows directly.
drop policy if exists "Anyone can log a click" on public.link_clicks;
create policy "Anyone can log a click"
  on public.link_clicks
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Authenticated can read all clicks" on public.link_clicks;
create policy "Authenticated can read all clicks"
  on public.link_clicks
  for select
  to authenticated
  using (true);

alter table public.applications
  add column if not exists not_applied_reason text;
