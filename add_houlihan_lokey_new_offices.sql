-- New opportunities added 28 Sept 2026.
-- Founder asked to check the 8 companies from the carousel-deck project for
-- new roles. Houlihan Lokey already had very extensive coverage (68 rows
-- across ~16 offices and most divisions), so most of the 28 currently-live
-- postings matched what's already tracked. Found 6 genuinely new roles in
-- offices/divisions not previously covered: Stockholm (new office), Paris
-- Secondary Advisory (new division), London Real Estate Capital Solutions
-- (previously only tracked in Munich), Chicago Fund Opinions (new office +
-- division), West Palm Beach Secondary Solutions (new office, deadline
-- 2 Oct 2026), and Atlanta Transaction Opinions/Board Advisory (new
-- division at an existing office). Two APAC postings (Shanghai, Hong Kong)
-- were found but excluded as out of this platform's UK/EU/US scope.
-- Verified directly on Houlihan Lokey's own Workday board
-- (hl.wd1.myworkdayjobs.com/Campus), not aggregator data.
-- Already applied directly to production via the Supabase admin client -
-- this file is kept for the repo's audit trail.

insert into public.opportunities
  (company, role_title, category, region, city, country, cycle_year, status,
   deadline, apply_url, notes, visa_sponsorship, is_published)
values
  ('Houlihan Lokey', '6-Month Off-Cycle Internship - Corporate Finance, Stockholm', 'off_cycle', 'eu', 'Stockholm', 'Sweden', 2027, 'open',
   null, 'https://hl.wd1.myworkdayjobs.com/en-US/Campus/job/Stockholm-Sweden/XMLNAME-6-Month-Off-Cycle-Internship---Corporate-Finance_R3600',
   $q$6-month off-cycle internship in Corporate Finance (Technology sector focus), Stockholm - a new office for Houlihan Lokey's tracked footprint. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Houlihan Lokey', '6-Month Off-Cycle Intern - Capital Solutions, Secondary Advisory (January 2027), Paris', 'off_cycle', 'eu', 'Paris', 'France', 2027, 'open',
   null, 'https://hl.wd1.myworkdayjobs.com/en-US/Campus/job/Paris-France/XMLNAME-6-Month-Off-Cycle-Intern---Capital-Solutions--Secondary-Advisory--January-2027-_R3617',
   $q$6-month off-cycle internship starting Jan 2027 on Houlihan Lokey's Secondaries Advisory Group in Paris, advising PE sponsors/LPs on LP-led and GP-led secondary transactions - distinct from the Private Debt/Debt Advisory Capital Solutions roles already tracked for Paris. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Houlihan Lokey', '6-Month Off-Cycle Intern - Real Estate Capital Solutions, London', 'off_cycle', 'uk', 'London', 'United Kingdom', 2027, 'open',
   null, 'https://hl.wd1.myworkdayjobs.com/en-US/Campus/job/London-UK/XMLNAME-6-Month-Off-Cycle-Intern--Real-Estate-Capital-Solutions--London_R3047',
   $q$6-month off-cycle internship on Houlihan Lokey's Real Estate Capital Solutions team in London - previously only tracked in Munich as a Q4 off-cycle intern. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Houlihan Lokey', '2027 Financial Analyst (Class of 2027), Fund Opinions - Chicago', 'grad_scheme', 'us', 'Chicago', 'United States', 2027, 'open',
   null, 'https://hl.wd1.myworkdayjobs.com/en-US/Campus/job/Chicago-IL-USA/XMLNAME-2027-Financial-Analyst--Class-of-2027---Fund-Opinions---Chicago_R3587',
   $q$Graduate Financial Analyst role in Chicago (a new office for Houlihan Lokey's tracked footprint) on the Fund Opinions team within Financial and Valuation Advisory - a distinct practice from the Portfolio/Corporate Valuation roles already tracked elsewhere. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Houlihan Lokey', 'Financial Analyst (Class of 2027) - Capital Solutions, West Palm Beach Secondary Solutions', 'grad_scheme', 'us', 'West Palm Beach', 'United States', 2027, 'open',
   '2026-10-02', 'https://hl.wd1.myworkdayjobs.com/en-US/Campus/job/West-Palm-Beach-FL-USA/Financial-Analyst--Class-of-2027----Capital-Solutions--West-Palm-Beach-Secondary-Solutions_R3575',
   $q$Graduate Financial Analyst role in West Palm Beach (a new office) on Houlihan Lokey's Secondary Solutions team advising on PE secondaries. Deadline is only days away - apply by 2 Oct 2026. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Houlihan Lokey', '2027 Financial Analyst (Class of 2027) - Transaction Opinions and Board & Special Committee Advisory, Atlanta', 'grad_scheme', 'us', 'Atlanta', 'United States', 2027, 'open',
   null, 'https://hl.wd1.myworkdayjobs.com/en-US/Campus/job/Atlanta-GA-USA/XMLNAME-2027-Financial-Analyst--Class-of-2027----Transaction-Opinions-and-Board---Special-Committee-Advisory---Atlanta_R3608',
   $q$Graduate Financial Analyst role in Atlanta on Houlihan Lokey's Transaction Opinions and Board & Special Committee Advisory team (fairness opinions, board advisory) - distinct from the Corporate Valuation/Business Services/AI Business Development Atlanta roles already tracked. Sourced 28 Sept 2026.$q$,
   'unknown', true);
