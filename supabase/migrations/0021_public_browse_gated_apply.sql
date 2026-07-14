-- Revert 0020: browsing opportunities, events, interview resources, and
-- international resources is public again (needed for SEO/discovery,
-- matching how job boards like Bright Network actually work). Signing in
-- is now required at the moment of acting instead: applying (see
-- /go/[opportunityId]), tracking, saving alerts, and registering for
-- events already require an account.

drop policy if exists "Public can read published opportunities" on public.opportunities;
create policy "Public can read published opportunities"
  on public.opportunities
  for select
  to anon
  using (is_published = true);

drop policy if exists "Public can read published events" on public.events;
create policy "Public can read published events"
  on public.events
  for select
  to anon
  using (is_published = true);

drop policy if exists "Public can read published interview resources" on public.interview_resources;
create policy "Public can read published interview resources"
  on public.interview_resources
  for select
  to anon
  using (is_published = true);

drop policy if exists "Authenticated can read published international resources" on public.international_resources;
drop policy if exists "Public can read published international resources" on public.international_resources;
create policy "Public can read published international resources"
  on public.international_resources
  for select
  to anon, authenticated
  using (is_published = true);
