-- Work-with-us submissions, testimonials ("In Their Shoes"), and newsletter
-- articles ("Get the latest") for the redesigned landing page.

-- 1) Contact submissions (Work with us form: student volunteer or sponsor)

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  submission_type text not null check (submission_type in ('student', 'sponsor')),
  name text not null,
  email text not null,
  message text,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at);

alter table public.contact_submissions enable row level security;

-- Anyone (including logged-out visitors) can submit the form.
drop policy if exists "Anyone can submit a contact form" on public.contact_submissions;
create policy "Anyone can submit a contact form"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can read contact submissions" on public.contact_submissions;
create policy "Admins can read contact submissions"
  on public.contact_submissions
  for select
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can delete contact submissions" on public.contact_submissions;
create policy "Admins can delete contact submissions"
  on public.contact_submissions
  for delete
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));

-- 2) Testimonials ("In Their Shoes")

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  subtitle text,
  story text not null,
  photo_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists testimonials_is_published_idx on public.testimonials (is_published);

drop trigger if exists testimonials_set_updated_at on public.testimonials;
create trigger testimonials_set_updated_at
  before update on public.testimonials
  for each row
  execute function public.set_updated_at();

alter table public.testimonials enable row level security;

drop policy if exists "Public can read published testimonials" on public.testimonials;
create policy "Public can read published testimonials"
  on public.testimonials
  for select
  to anon
  using (is_published = true);

drop policy if exists "Admins can read all testimonials" on public.testimonials;
create policy "Admins can read all testimonials"
  on public.testimonials
  for select
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can insert testimonials" on public.testimonials;
create policy "Admins can insert testimonials"
  on public.testimonials
  for insert
  to authenticated
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can update testimonials" on public.testimonials;
create policy "Admins can update testimonials"
  on public.testimonials
  for update
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can delete testimonials" on public.testimonials;
create policy "Admins can delete testimonials"
  on public.testimonials
  for delete
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));

-- 3) Newsletter articles ("Get the latest")

create table if not exists public.newsletter_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  link_url text not null,
  published_date date,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists newsletter_articles_is_published_idx
  on public.newsletter_articles (is_published);

drop trigger if exists newsletter_articles_set_updated_at on public.newsletter_articles;
create trigger newsletter_articles_set_updated_at
  before update on public.newsletter_articles
  for each row
  execute function public.set_updated_at();

alter table public.newsletter_articles enable row level security;

drop policy if exists "Public can read published newsletter articles" on public.newsletter_articles;
create policy "Public can read published newsletter articles"
  on public.newsletter_articles
  for select
  to anon
  using (is_published = true);

drop policy if exists "Admins can read all newsletter articles" on public.newsletter_articles;
create policy "Admins can read all newsletter articles"
  on public.newsletter_articles
  for select
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can insert newsletter articles" on public.newsletter_articles;
create policy "Admins can insert newsletter articles"
  on public.newsletter_articles
  for insert
  to authenticated
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can update newsletter articles" on public.newsletter_articles;
create policy "Admins can update newsletter articles"
  on public.newsletter_articles
  for update
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can delete newsletter articles" on public.newsletter_articles;
create policy "Admins can delete newsletter articles"
  on public.newsletter_articles
  for delete
  to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()));
