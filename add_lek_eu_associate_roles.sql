-- New opportunities added 28 Sept 2026.
-- Founder asked to check the 8 companies from the carousel-deck project for
-- new roles. L.E.K. Consulting had 4 London rows tracked already (all
-- confirmed still current). Found 8 new EU roles - Paris, Munich and
-- Wroclaw generalist/Life-Sciences Associate and internship positions -
-- part of the same Jan/March 2027 entry-level intake as the London roles.
-- Verified directly on L.E.K.'s Oleeo-hosted job board (lek.tal.net),
-- reached via lek.com/careers - not aggregator data.
-- Already applied directly to production via the Supabase admin client -
-- this file is kept for the repo's audit trail.

insert into public.opportunities
  (company, role_title, category, region, city, country, cycle_year, status,
   deadline, apply_url, notes, visa_sponsorship, is_published)
values
  ('L.E.K. Consulting', 'Paris Office - Generalist Associate (Entry-level, CDI) - March 2027', 'entry_level', 'eu', 'Paris', 'France', 2027, 'open',
   '2026-10-11', 'https://lek.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-2/xf-d492e7f418e5/candidate/so/pm/1/pl/1/opp/4078-Paris-Office-Generalist-Associate-m-f-d-Entry-level-position-CDI-March-2027/en-GB',
   $q$Full-time entry-level Associate role in L.E.K.'s Paris office, joining project teams to conduct market/competitor research and financial analysis across industry sectors. Requires fluent French and English. Start March 2027 (permanent/CDI). Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('L.E.K. Consulting', 'Paris Office - Life Sciences Associate Intern - January 2027', 'internship', 'eu', 'Paris', 'France', 2027, 'open',
   '2026-10-17', 'https://lek.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-2/xf-d492e7f418e5/candidate/so/pm/1/pl/1/opp/4085-Paris-Office-Life-Sciences-Associate-Intern-m-f-d-Start-January-2027/en-GB',
   $q$Internship on L.E.K.'s European Life Sciences team in Paris, for candidates with a bioscience/medicine/pharma/engineering background and an interest in business strategy. Market research, financial analysis and client-facing project work; fluent French and English required. Start January 2027. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('L.E.K. Consulting', 'Munich Office - Generalist Associate (Entry level) - March 2027', 'entry_level', 'eu', 'Munich', 'Germany', 2027, 'open',
   '2026-10-25', 'https://lek.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-2/xf-d492e7f418e5/candidate/so/pm/1/pl/1/opp/4066-Munich-Office-Associate-m-f-d-Entry-level-position-Start-March-2027/en-GB',
   $q$Entry-level generalist Associate role in the Munich office, giving exposure to multiple industries via primary/secondary research and strategic/financial analysis on client engagements. Requires strong German and English. Start March 2027. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('L.E.K. Consulting', 'Munich Office - Associate Intern (3-6 months) - March 2027', 'internship', 'eu', 'Munich', 'Germany', 2027, 'open',
   '2026-10-25', 'https://lek.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-2/xf-d492e7f418e5/candidate/so/pm/1/pl/1/opp/4067-Munich-Office-Associate-Intern-m-f-d-Start-March-2027-3-6-months/en-GB',
   $q$A 3-6 month generalist internship in Munich giving students hands-on exposure to L.E.K.'s consulting work - research, analysis and insight development alongside project teams. Start March 2027. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('L.E.K. Consulting', 'Munich Office - Life Sciences Associate (Entry level) - March 2027', 'entry_level', 'eu', 'Munich', 'Germany', 2027, 'open',
   '2026-10-25', 'https://lek.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-2/xf-d492e7f418e5/candidate/so/pm/1/pl/1/opp/4068-Munich-Office-Life-Sciences-Associate-m-f-d-Entry-level-position-Start-March-2027/en-GB',
   $q$Entry-level Associate role on the Munich Life Sciences team, for candidates with a scientific/health background applying that knowledge to commercial strategy problems for pharma, biotech and healthcare clients. Start March 2027. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('L.E.K. Consulting', 'Munich Office - Life Sciences Specialist (PhD/MD applicants only) - March 2027', 'entry_level', 'eu', 'Munich', 'Germany', 2027, 'open',
   '2026-10-25', 'https://lek.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-2/xf-d492e7f418e5/candidate/so/pm/1/pl/1/opp/4069-Munich-Office-Life-Sciences-Specialist-m-f-d-for-PhD-and-MD-applicants-only-Start-March-2027/en-GB',
   $q$Specialist entry-level role in Munich open only to PhD and MD holders, applying advanced scientific expertise to life-sciences strategy consulting engagements. Mirrors the existing London Life Sciences Specialist track. Start March 2027. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('L.E.K. Consulting', 'Wroclaw Office - Generalist Associate (Entry level) - January or March 2027', 'entry_level', 'eu', 'Wroclaw', 'Poland', 2027, 'open',
   '2026-10-25', 'https://lek.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-2/xf-d492e7f418e5/candidate/so/pm/1/pl/1/opp/4070-Wroclaw-Office-Associate-m-f-d-Entry-level-position-Start-January-or-March-2027/en-GB',
   $q$Entry-level generalist Associate position in L.E.K.'s Wroclaw office, working on research and analytical project work across European engagements, with flexible January or March 2027 start dates. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('L.E.K. Consulting', 'Wroclaw Office - Associate Intern (3-6 months) - January or March 2027', 'internship', 'eu', 'Wroclaw', 'Poland', 2027, 'open',
   '2026-10-25', 'https://lek.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-2/xf-d492e7f418e5/candidate/so/pm/1/pl/1/opp/4071-Wroclaw-Office-Associate-Intern-m-f-d-Start-January-or-March-2027-3-6-months/en-GB',
   $q$A 3-6 month generalist internship in Wroclaw giving students exposure to L.E.K.'s consulting methodology and client project work, with flexible January or March 2027 start dates. Sourced 28 Sept 2026.$q$,
   'unknown', true);
