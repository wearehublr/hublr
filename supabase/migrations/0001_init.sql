-- Early career opportunity tracker: core schema

create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role_title text not null,
  category text not null check (
    category in (
      'summer_internship',
      'off_cycle',
      'spring_internship',
      'co_op',
      'grad_scheme',
      'full_time_analyst',
      'other'
    )
  ),
  region text not null check (region in ('uk', 'eu', 'us', 'other')),
  country text,
  industry text,
  cycle_year int not null default 2027,
  status text not null default 'open' check (
    status in ('open', 'upcoming', 'closed', 'rolling')
  ),
  open_date date,
  deadline date,
  apply_url text not null,
  notes text,
  source_url text,
  discovered_via text not null default 'manual' check (
    discovered_via in ('manual', 'auto')
  ),
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists opportunities_is_published_idx
  on public.opportunities (is_published);
create index if not exists opportunities_region_idx on public.opportunities (region);
create index if not exists opportunities_category_idx on public.opportunities (category);
create index if not exists opportunities_deadline_idx on public.opportunities (deadline);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists opportunities_set_updated_at on public.opportunities;
create trigger opportunities_set_updated_at
  before update on public.opportunities
  for each row
  execute function public.set_updated_at();

alter table public.opportunities enable row level security;

-- Public (anon) visitors can only read published rows.
drop policy if exists "Public can read published opportunities" on public.opportunities;
create policy "Public can read published opportunities"
  on public.opportunities
  for select
  to anon
  using (is_published = true);

-- Any authenticated user (i.e. the signed-in admin) can read every row.
drop policy if exists "Authenticated can read all opportunities" on public.opportunities;
create policy "Authenticated can read all opportunities"
  on public.opportunities
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can insert opportunities" on public.opportunities;
create policy "Authenticated can insert opportunities"
  on public.opportunities
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update opportunities" on public.opportunities;
create policy "Authenticated can update opportunities"
  on public.opportunities
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete opportunities" on public.opportunities;
create policy "Authenticated can delete opportunities"
  on public.opportunities
  for delete
  to authenticated
  using (true);
