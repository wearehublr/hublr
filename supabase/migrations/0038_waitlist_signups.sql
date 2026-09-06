-- Pre-launch email capture: people who see the launch announcement can join
-- before the site opens, then get one "we're live" email when the founder
-- is ready. Deliberately separate from real accounts (no auth.users row) -
-- just an email list until launch day.

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  notified_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists waitlist_signups_email_key
  on public.waitlist_signups (lower(email));

alter table public.waitlist_signups enable row level security;

-- Anyone (including logged-out visitors) can join the waitlist.
drop policy if exists "Anyone can join the waitlist" on public.waitlist_signups;
create policy "Anyone can join the waitlist"
  on public.waitlist_signups
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can read waitlist signups" on public.waitlist_signups;
create policy "Admins can read waitlist signups"
  on public.waitlist_signups
  for select
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can update waitlist signups" on public.waitlist_signups;
create policy "Admins can update waitlist signups"
  on public.waitlist_signups
  for update
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can delete waitlist signups" on public.waitlist_signups;
create policy "Admins can delete waitlist signups"
  on public.waitlist_signups
  for delete
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));
