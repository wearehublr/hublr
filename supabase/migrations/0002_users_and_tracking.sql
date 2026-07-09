-- Personal application tracking + document storage for logged-in users

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  label text not null,
  doc_type text not null default 'cv' check (doc_type in ('cv', 'cover_letter', 'other')),
  storage_path text not null,
  file_name text not null,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create index if not exists documents_user_id_idx on public.documents (user_id);

alter table public.documents enable row level security;

drop policy if exists "Users manage their own documents" on public.documents;
create policy "Users manage their own documents"
  on public.documents
  for all
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  opportunity_id uuid references public.opportunities (id) on delete set null,
  company text not null,
  role_title text not null,
  apply_url text,
  cycle_year int,
  stage text not null default 'saved' check (
    stage in (
      'saved',
      'applied',
      'oa_assessment',
      'interview',
      'offer',
      'rejected',
      'withdrawn'
    )
  ),
  applied_date date,
  deadline date,
  notes text,
  cv_document_id uuid references public.documents (id) on delete set null,
  cover_letter_document_id uuid references public.documents (id) on delete set null,
  reminder_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists applications_user_id_idx on public.applications (user_id);
create index if not exists applications_deadline_idx on public.applications (deadline);
create index if not exists applications_stage_idx on public.applications (stage);

-- Prevents tracking the same curated opportunity twice for the same user.
create unique index if not exists applications_user_opportunity_unique
  on public.applications (user_id, opportunity_id)
  where opportunity_id is not null;

drop trigger if exists applications_set_updated_at on public.applications;
create trigger applications_set_updated_at
  before update on public.applications
  for each row
  execute function public.set_updated_at();

alter table public.applications enable row level security;

drop policy if exists "Users manage their own applications" on public.applications;
create policy "Users manage their own applications"
  on public.applications
  for all
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Private storage bucket for CVs/cover letters, created via SQL so no manual
-- dashboard step is needed beyond running this migration.
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

drop policy if exists "Users can read their own document files" on storage.objects;
create policy "Users can read their own document files"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can upload their own document files" on storage.objects;
create policy "Users can upload their own document files"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can delete their own document files" on storage.objects;
create policy "Users can delete their own document files"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
