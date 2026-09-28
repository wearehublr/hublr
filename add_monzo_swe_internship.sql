-- New opportunity added 28 Sept 2026.
-- Founder flagged that Monzo had just opened a 2027 SWE internship in
-- London. Verified directly on Monzo's Greenhouse job board - genuinely
-- new, not previously tracked (existing Monzo rows were Internal
-- Communications Advisor, Finance Internal Controls Analyst, and Graduate
-- Credit Analyst).
-- Already applied directly to production via the Supabase admin client -
-- this file is kept for the repo's audit trail.

insert into public.opportunities
  (company, role_title, category, region, city, country, cycle_year, status,
   deadline, apply_url, notes, visa_sponsorship, sponsorship_verified_at, is_published)
values
  ('Monzo', 'Associate Software Engineer - Intern (Summer 2027)', 'summer_internship', 'uk', 'London', 'United Kingdom', 2027, 'open',
   '2026-11-01', 'https://job-boards.greenhouse.io/monzo/jobs/8156261',
   $q$12-week Software Engineering internship, London (hybrid, 2 days/week in office), £42,500 pro rata. Two start date options: 1 Jun-20 Aug 2027 or 30 Jun-17 Sep 2027. For students graduating in 2028. Offers extended on a rolling basis, so encouraged to apply before the 1 Nov 2026 deadline. Sourced 28 Sept 2026.$q$,
   'no', '2026-09-28', true);
