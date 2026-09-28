-- New opportunities added 28 Sept 2026.
-- News UK was flagged by the founder as having recently opened UK roles. An
-- earlier research agent concluded there was nothing new to add because its
-- tools were blocked from newscareers.co.uk. The founder independently found
-- and shared 4 live apprentice vacancy URLs while spot-checking; verified
-- directly (including paginating the full 25-role listing via the site's
-- ASP.NET __doPostBack mechanism) that these 4 are genuinely new and are the
-- complete set of early-career postings currently live - everything else on
-- the board is an experienced-hire role.
-- Already applied directly to production via the Supabase admin client -
-- this file is kept for the repo's audit trail.

insert into public.opportunities
  (company, role_title, category, region, city, country, cycle_year, status,
   deadline, apply_url, notes, visa_sponsorship, is_published)
values
  ('News UK', 'HR Apprentice', 'apprenticeship', 'uk', 'London', 'United Kingdom', 2027, 'open',
   '2026-10-01', 'https://www.newscareers.co.uk/vacancies/4559/hr-apprentice.html',
   $q$2-year apprenticeship, People department, Level 5 CIPD qualification, start Jan 2027.$q$,
   'unknown', true),

  ('News UK', 'Apprentice Entertainment Reporter', 'apprenticeship', 'uk', 'London', 'United Kingdom', 2027, 'open',
   '2026-09-30', 'https://www.newscareers.co.uk/vacancies/4530/apprentice-entertainment-reporter.html',
   $q$2-year apprenticeship, The Sun, NCTJ Diploma qualification, start Jan 2027.$q$,
   'unknown', true),

  ('News UK', 'Advertising Sales Apprentice', 'apprenticeship', 'uk', 'London', 'United Kingdom', 2027, 'open',
   '2026-09-28', 'https://www.newscareers.co.uk/vacancies/4547/advertising-sales-apprentice--news-uk.html',
   $q$2-year apprenticeship, Commercial department, Sales Executive Level 4 qualification, start Jan 2027. Closes today.$q$,
   'unknown', true),

  ('News UK', 'Digital Merchandising Apprentice - Times Holidays', 'apprenticeship', 'uk', 'London', 'United Kingdom', 2027, 'open',
   '2026-09-28', 'https://www.newscareers.co.uk/vacancies/4546/digital-merchandising-apprentice--times-holidays.html',
   $q$2-year apprenticeship, Times Media, Marketing Level 3 qualification, start Jan 2027. Closes today.$q$,
   'unknown', true);
