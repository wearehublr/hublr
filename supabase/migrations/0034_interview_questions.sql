-- First-party interview question bank, transcribed from the founder's own
-- guides, so students can browse actual Q&A on-site instead of a PDF link.
-- Shares the same topic vocabulary as interview_resources.topic (0033) so
-- one set of tabs filters both; expanding that vocabulary here to cover
-- the question types the founder's content actually uses.

alter table public.interview_resources
  drop constraint if exists interview_resources_topic_check;
alter table public.interview_resources
  add constraint interview_resources_topic_check check (
    topic in (
      'hirevue', 'assessment_centre', 'case_study', 'competency', 'technical',
      'general', 'motivational', 'strength_based', 'basic'
    )
  );

create table if not exists public.interview_questions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer_1_label text,
  answer_1 text not null,
  answer_2_label text,
  answer_2 text,
  topic text not null check (
    topic in (
      'hirevue', 'assessment_centre', 'case_study', 'competency', 'technical',
      'general', 'motivational', 'strength_based', 'basic'
    )
  ),
  source text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists interview_questions_is_published_idx
  on public.interview_questions (is_published);

drop trigger if exists interview_questions_set_updated_at on public.interview_questions;
create trigger interview_questions_set_updated_at
  before update on public.interview_questions
  for each row
  execute function public.set_updated_at();

alter table public.interview_questions enable row level security;

-- Two explicit read policies (anon + authenticated), not one unscoped
-- policy - migration 0016 exists because this exact codebase previously
-- shipped an anon-only policy that left real logged-in students matching
-- no SELECT policy at all and seeing nothing. Same fix, applied up front.
drop policy if exists "Public can read published interview questions" on public.interview_questions;
create policy "Public can read published interview questions"
  on public.interview_questions
  for select
  to anon
  using (is_published = true);

drop policy if exists "Authenticated can read published interview questions" on public.interview_questions;
create policy "Authenticated can read published interview questions"
  on public.interview_questions
  for select
  to authenticated
  using (is_published = true);

drop policy if exists "Admins can read all interview questions" on public.interview_questions;
create policy "Admins can read all interview questions"
  on public.interview_questions
  for select
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can insert interview questions" on public.interview_questions;
create policy "Admins can insert interview questions"
  on public.interview_questions
  for insert
  to authenticated
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can update interview questions" on public.interview_questions;
create policy "Admins can update interview questions"
  on public.interview_questions
  for update
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can delete interview questions" on public.interview_questions;
create policy "Admins can delete interview questions"
  on public.interview_questions
  for delete
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));
