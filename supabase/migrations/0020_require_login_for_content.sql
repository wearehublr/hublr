-- Require a signed-in session to read opportunities, events, interview
-- resources, and international resources. These were previously readable
-- by anyone directly via the public API (the anon key is embedded in the
-- client bundle), even once the UI itself was gated behind login.
-- Testimonials and newsletter articles stay public since they're shown on
-- the logged-out marketing homepage.

drop policy if exists "Public can read published opportunities" on public.opportunities;
drop policy if exists "Public can read published events" on public.events;
drop policy if exists "Public can read published interview resources" on public.interview_resources;

drop policy if exists "Public can read published international resources" on public.international_resources;
create policy "Authenticated can read published international resources"
  on public.international_resources
  for select
  to authenticated
  using (is_published = true);
