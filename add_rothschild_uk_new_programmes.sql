-- New opportunities added 28 Sept 2026.
-- Founder asked to check the 8 companies from the carousel-deck project for
-- new roles. Rothschild & Co (16 UK rows already tracked, all Summer
-- Analyst/Intern programmes) turned out to have 5 UK postings in
-- categories not previously covered at all: Year-13 work experience
-- programmes, spring insight programmes (incl. a womens-only track), and
-- an evergreen graduate programme. Verified directly on
-- rothschildandco.com/en/careers - not aggregator data.
-- Note: ~30 additional EU postings (Paris, Madrid, Milan, Frankfurt,
-- Zurich, Luxembourg) were also found live on the site but not yet
-- detailed/added - flagged separately for a founder decision.
-- Already applied directly to production via the Supabase admin client -
-- this file is kept for the repo's audit trail.

insert into public.opportunities
  (company, role_title, category, region, city, country, cycle_year, status,
   deadline, open_date, apply_url, notes, visa_sponsorship, is_published)
values
  ('Rothschild & Co', 'UK Horizon Women's Work Experience Programme - Summer 2027', 'insight_program', 'uk', 'London', 'United Kingdom', 2027, 'open',
   null, '2026-12-07', 'https://www.rothschildandco.com/en/careers/students-and-graduates/opportunities/uk-horizon-womens-work-experience-programme-summer-2027/',
   $q$3-day work experience programme in August 2027 for female Year 13 students considering careers in financial advisory. Shadow junior bankers, attend skills sessions and networking events across Global Advisory, and work on a group project. Requires min. 136 UCAS points and commutable distance to London. Applications open 7 Dec 2026, rolling. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Rothschild & Co', 'UK Pioneer Work Experience Programme - Summer 2027', 'insight_program', 'uk', 'London', 'United Kingdom', 2027, 'open',
   null, '2026-12-07', 'https://www.rothschildandco.com/en/careers/students-and-graduates/opportunities/uk-pioneer-work-experience-programme-summer-2027/',
   $q$3-day insight programme in August 2027 for Year 13 students exploring finance careers, covering M&A, Debt and Restructuring, and Global Markets Solutions. Includes networking with junior bankers, analyst presentations, and a group project with a final presentation. Applications open 7 Dec 2026, rolling. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Rothschild & Co', '2027 UK Global Advisory Women's Horizon Insight Programme - London', 'insight_program_general', 'uk', 'London', 'United Kingdom', 2027, 'open',
   null, '2026-09-29', 'https://www.rothschildandco.com/en/careers/students-and-graduates/opportunities/ga2027-uk-global-advisory-womens-horizon-insight-programme-london/',
   $q$4-day spring insight programme (Spring 2027) for female university/Master's students, covering Global Advisory (M&A, restructuring), Wealth & Asset Management, and Five Arrows. Strong performers are fast-tracked into next year's Summer Internship assessment process. Applications open 29 Sept 2026, rolling. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Rothschild & Co', '2027 UK Global Advisory Spring Insight Programme', 'insight_program_general', 'uk', 'London', 'United Kingdom', 2027, 'open',
   null, '2026-09-29', 'https://www.rothschildandco.com/en/careers/students-and-graduates/opportunities/2027-uk-global-advisory-spring-insight-programme/',
   $q$4-day general insight programme (Spring 2027) for first-year undergraduates interested in advisory careers, covering Global Advisory, Wealth & Asset Management, and Five Arrows. Includes shadowing, skills sessions, and a fast-track route into the following year's Summer Internship assessment for strong candidates. Applications open 29 Sept 2026, rolling. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Rothschild & Co', 'Evergreen - 2027 Global Advisory Graduate Programme - London', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'open',
   null, null, 'https://www.rothschildandco.com/en/careers/students-and-graduates/opportunities/evergreen-2027-global-advisory-graduate-programme-london/',
   $q$Graduate programme starting July 2027, opening with a 6-week Global Graduate Training Programme in London covering financial concepts and professional skills, followed by rotations supporting senior bankers on financial modelling, valuation, and client coordination. Targets final-year students/recent grads with min. 2:1 degree. Evergreen (rolling) listing. Sourced 28 Sept 2026.$q$,
   'unknown', true);
