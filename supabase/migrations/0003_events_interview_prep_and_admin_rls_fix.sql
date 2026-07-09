-- 1) Admin table + RLS security fix
--
-- The original opportunities policies (0001_init.sql) let ANY authenticated
-- user read unpublished rows and insert/update/delete, relying entirely on
-- the app's requireAdmin() check to keep non-admins out. That was fine when
-- the only account that could log in was the admin's, but open signup means
-- any registered student can now call Supabase directly with their own
-- session and bypass the app layer entirely. This introduces a real
-- `admins` table and tightens the opportunities policies to check it, and
-- events/interview_resources below are built with the correct policies from
-- the start.

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.admins enable row level security;

drop policy if exists "Users can check their own admin status" on public.admins;
create policy "Users can check their own admin status"
  on public.admins
  for select
  to authenticated
  using (user_id = auth.uid());

-- Run this once, after creating your admin login, to grant yourself access:
--   insert into public.admins (user_id)
--   select id from auth.users where email = 'you@example.com'
--   on conflict do nothing;

drop policy if exists "Authenticated can read all opportunities" on public.opportunities;
drop policy if exists "Authenticated can insert opportunities" on public.opportunities;
drop policy if exists "Authenticated can update opportunities" on public.opportunities;
drop policy if exists "Authenticated can delete opportunities" on public.opportunities;

create policy "Admins can read all opportunities"
  on public.opportunities
  for select
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admins can insert opportunities"
  on public.opportunities
  for insert
  to authenticated
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admins can update opportunities"
  on public.opportunities
  for update
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admins can delete opportunities"
  on public.opportunities
  for delete
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));

-- 2) Events

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_type text not null default 'networking' check (
    event_type in ('networking', 'workshop', 'panel', 'career_fair', 'other')
  ),
  event_date timestamptz not null,
  location_type text not null default 'virtual' check (
    location_type in ('virtual', 'in_person')
  ),
  location text,
  registration_url text,
  source_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists events_is_published_idx on public.events (is_published);
create index if not exists events_event_date_idx on public.events (event_date);
create index if not exists events_event_type_idx on public.events (event_type);

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
  before update on public.events
  for each row
  execute function public.set_updated_at();

alter table public.events enable row level security;

drop policy if exists "Public can read published events" on public.events;
create policy "Public can read published events"
  on public.events
  for select
  to anon
  using (is_published = true);

drop policy if exists "Admins can read all events" on public.events;
create policy "Admins can read all events"
  on public.events
  for select
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can insert events" on public.events;
create policy "Admins can insert events"
  on public.events
  for insert
  to authenticated
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can update events" on public.events;
create policy "Admins can update events"
  on public.events
  for update
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can delete events" on public.events;
create policy "Admins can delete events"
  on public.events
  for delete
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));

-- 3) Interview prep resources

create table if not exists public.interview_resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  resource_type text not null default 'guide' check (
    resource_type in ('guide', 'newsletter', 'other')
  ),
  link_url text not null,
  is_paid boolean not null default false,
  price_label text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists interview_resources_is_published_idx
  on public.interview_resources (is_published);

drop trigger if exists interview_resources_set_updated_at on public.interview_resources;
create trigger interview_resources_set_updated_at
  before update on public.interview_resources
  for each row
  execute function public.set_updated_at();

alter table public.interview_resources enable row level security;

drop policy if exists "Public can read published interview resources" on public.interview_resources;
create policy "Public can read published interview resources"
  on public.interview_resources
  for select
  to anon
  using (is_published = true);

drop policy if exists "Admins can read all interview resources" on public.interview_resources;
create policy "Admins can read all interview resources"
  on public.interview_resources
  for select
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can insert interview resources" on public.interview_resources;
create policy "Admins can insert interview resources"
  on public.interview_resources
  for insert
  to authenticated
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can update interview resources" on public.interview_resources;
create policy "Admins can update interview resources"
  on public.interview_resources
  for update
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can delete interview resources" on public.interview_resources;
create policy "Admins can delete interview resources"
  on public.interview_resources
  for delete
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));
