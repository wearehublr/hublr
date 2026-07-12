-- Student profile: one row per user, editable at /profile.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  university text,
  degree text,
  study_year text,
  goal text,
  summary text,
  student_status text check (student_status in ('home', 'international')),
  interested_industries text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

alter table public.profiles enable row level security;

drop policy if exists "Users manage their own profile" on public.profiles;
create policy "Users manage their own profile"
  on public.profiles
  for all
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());
