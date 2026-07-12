-- Curated guidance content for the international student hub, same shape
-- as interview_resources.

create table if not exists public.international_resources (
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

create index if not exists international_resources_is_published_idx
  on public.international_resources (is_published);

drop trigger if exists international_resources_set_updated_at on public.international_resources;
create trigger international_resources_set_updated_at
  before update on public.international_resources
  for each row
  execute function public.set_updated_at();

alter table public.international_resources enable row level security;

drop policy if exists "Public can read published international resources" on public.international_resources;
create policy "Public can read published international resources"
  on public.international_resources
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins can read all international resources" on public.international_resources;
create policy "Admins can read all international resources"
  on public.international_resources
  for select
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can insert international resources" on public.international_resources;
create policy "Admins can insert international resources"
  on public.international_resources
  for insert
  to authenticated
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can update international resources" on public.international_resources;
create policy "Admins can update international resources"
  on public.international_resources
  for update
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can delete international resources" on public.international_resources;
create policy "Admins can delete international resources"
  on public.international_resources
  for delete
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));
