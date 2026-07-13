-- Bug fix: several tables (opportunities, events, interview_resources,
-- testimonials, newsletter_articles) had a "public can read published"
-- policy scoped to `anon` only, and a separate admin-only read policy
-- scoped to `authenticated`. Net effect: a real logged-in student (not
-- anon, not admin) had zero matching SELECT policy on these tables and saw
-- nothing at all. This adds the missing "authenticated can read published"
-- policy to each, matching what anon already has.

drop policy if exists "Authenticated can read published opportunities" on public.opportunities;
create policy "Authenticated can read published opportunities"
  on public.opportunities
  for select
  to authenticated
  using (is_published = true);

drop policy if exists "Authenticated can read published events" on public.events;
create policy "Authenticated can read published events"
  on public.events
  for select
  to authenticated
  using (is_published = true);

drop policy if exists "Authenticated can read published interview resources" on public.interview_resources;
create policy "Authenticated can read published interview resources"
  on public.interview_resources
  for select
  to authenticated
  using (is_published = true);

drop policy if exists "Authenticated can read published testimonials" on public.testimonials;
create policy "Authenticated can read published testimonials"
  on public.testimonials
  for select
  to authenticated
  using (is_published = true);

drop policy if exists "Authenticated can read published newsletter articles" on public.newsletter_articles;
create policy "Authenticated can read published newsletter articles"
  on public.newsletter_articles
  for select
  to authenticated
  using (is_published = true);
