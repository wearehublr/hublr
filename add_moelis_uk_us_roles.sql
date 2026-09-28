-- New opportunities added 28 Sept 2026.
-- Founder asked to check the 8 companies from the carousel-deck project for
-- new roles. Moelis & Company had only 1 row tracked (a closed London
-- Summer Analyst listing) - essentially zero real coverage, and zero US
-- coverage at all. Found 11 new roles: 1 UK Summer Analyst posting (a
-- different business line - Private Capital Advisory - from the existing
-- closed row) and 10 US MBA Summer Associate postings across 6 offices.
-- Verified directly on Moelis's actual ATS (moelis-careers.tal.net), which
-- is separate from and not shown by moelis.com's marketing careers page or
-- their Workday board - both of those only show generic blurbs or a
-- "join talent community" placeholder.
-- Already applied directly to production via the Supabase admin client -
-- this file is kept for the repo's audit trail.

insert into public.opportunities
  (company, role_title, category, region, city, country, cycle_year, status,
   deadline, apply_url, notes, visa_sponsorship, is_published)
values
  ('Moelis & Company', '2027 Summer Analyst, Private Capital Advisory - London', 'summer_internship', 'uk', 'London', 'United Kingdom', 2027, 'open',
   '2026-10-02', 'https://moelis-careers.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-4/xf-af1bbd9ef016/candidate/so/pm/1/pl/2/opp/434-2027-Summer-Analyst-Private-Capital-Advisory-London/en-GB',
   $q$10-week summer internship in Moelis's Private Capital Advisory group (secondaries/primary fundraising advisory for PE sponsors), including sponsor/company research, financial modelling, client presentations, plus a 1-week firmwide training programme. For undergrads graduating 2028, min A-Level AAB/predicted 2:1, any degree. Requires completing the Suited assessment. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Moelis & Company', '2027 Summer Analyst, Investment Banking - Capital Structure Advisory - Dallas', 'summer_internship', 'us', 'Dallas', 'United States', 2027, 'open',
   '2026-10-25', 'https://moelis-careers.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-4/xf-ca8994077cb1/candidate/so/pm/1/pl/2/opp/436-2027-Summer-Analyst-Investment-Banking-Capital-Structure-Advisory-Dallas/en-GB',
   $q$10-week analyst internship on Moelis's restructuring/liability-management team in Dallas, financial modelling and live deal support. For undergrads graduating Dec 2027-Jul 2028. Requires Suited assessment. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Moelis & Company', '2027 Investment Banking Summer Associate - Generalist - Houston', 'summer_internship', 'us', 'Houston', 'United States', 2027, 'open',
   '2026-10-12', 'https://moelis-careers.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-4/xf-ca8994077cb1/candidate/so/pm/1/pl/2/opp/401-2027-Investment-Banking-Summer-Associate-Generalist-Houston/en-GB',
   $q$10-week MBA Summer Associate programme in Houston, significant exposure to deal activity, financial modelling and client presentations. $175,000 prorated annual salary. For MBA students graduating Dec 2027-Jul 2028; apply to only one location. Requires Suited assessment. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Moelis & Company', '2027 Investment Banking Summer Associate - Generalist - Los Angeles', 'summer_internship', 'us', 'Los Angeles', 'United States', 2027, 'open',
   '2026-11-19', 'https://moelis-careers.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-4/xf-ca8994077cb1/candidate/so/pm/1/pl/2/opp/399-2027-Investment-Banking-Summer-Associate-Generalist-Los-Angeles/en-GB',
   $q$10-week MBA Summer Associate programme in Los Angeles. $175,000 prorated annual salary. For MBA students graduating Dec 2027-Jul 2028; apply to only one location. Requires Suited assessment. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Moelis & Company', '2027 Investment Banking Summer Associate - Generalist - Chicago', 'summer_internship', 'us', 'Chicago', 'United States', 2027, 'open',
   '2026-11-19', 'https://moelis-careers.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-4/xf-ca8994077cb1/candidate/so/pm/1/pl/2/opp/400-2027-Investment-Banking-Summer-Associate-Generalist-Chicago/en-GB',
   $q$10-week MBA Summer Associate programme in Chicago. $175,000 prorated annual salary. For MBA students graduating Dec 2027-Jul 2028; apply to only one location. Requires Suited assessment. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Moelis & Company', '2027 Investment Banking Summer Associate - Business Services - San Francisco', 'summer_internship', 'us', 'San Francisco', 'United States', 2027, 'open',
   '2026-11-19', 'https://moelis-careers.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-4/xf-ca8994077cb1/candidate/so/pm/1/pl/2/opp/406-2027-Investment-Banking-Summer-Associate-Business-Services-San-Francisco/en-GB',
   $q$10-week MBA Summer Associate programme in San Francisco's Business Services group. $175,000 prorated annual salary. For MBA students graduating Dec 2027-Jul 2028; apply to only one location. Requires Suited assessment. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Moelis & Company', '2027 Investment Banking Summer Associate - Technology - San Francisco', 'summer_internship', 'us', 'San Francisco', 'United States', 2027, 'open',
   '2026-11-19', 'https://moelis-careers.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-4/xf-ca8994077cb1/candidate/so/pm/1/pl/2/opp/404-2027-Investment-Banking-Summer-Associate-Technology-San-Francisco/en-GB',
   $q$10-week MBA Summer Associate programme in San Francisco's Technology group. $175,000 prorated annual salary. For MBA students graduating Dec 2027-Jul 2028; apply to only one location. Requires Suited assessment. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Moelis & Company', '2027 Investment Banking Summer Associate - Technology - Boston', 'summer_internship', 'us', 'Boston', 'United States', 2027, 'open',
   '2026-11-19', 'https://moelis-careers.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-4/xf-ca8994077cb1/candidate/so/pm/1/pl/2/opp/405-2027-Investment-Banking-Summer-Associate-Technology-Boston/en-GB',
   $q$10-week MBA Summer Associate programme in Boston's Technology group. $175,000 prorated annual salary. For MBA students graduating Dec 2027-Jul 2028; apply to only one location. Requires Suited assessment. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Moelis & Company', '2027 Investment Banking Summer Associate - Capital Structure Advisory - New York', 'summer_internship', 'us', 'New York', 'United States', 2027, 'open',
   '2026-11-19', 'https://moelis-careers.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-4/xf-ca8994077cb1/candidate/so/pm/1/pl/2/opp/403-2027-Investment-Banking-Summer-Associate-Capital-Structure-Advisory-New-York/en-GB',
   $q$10-week MBA Summer Associate programme in New York's Capital Structure Advisory (restructuring) group. $175,000 prorated annual salary. For MBA students graduating Dec 2027-Jul 2028; apply to only one location. Requires Suited assessment. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Moelis & Company', '2027 Investment Banking Summer Associate - Life Sciences - New York', 'summer_internship', 'us', 'New York', 'United States', 2027, 'open',
   '2026-11-19', 'https://moelis-careers.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-4/xf-ca8994077cb1/candidate/so/pm/1/pl/2/opp/402-2027-Investment-Banking-Summer-Associate-Life-Sciences-New-York/en-GB',
   $q$10-week MBA Summer Associate programme in New York's Life Sciences group. $175,000 prorated annual salary. For MBA students graduating Dec 2027-Jul 2028; apply to only one location. Requires Suited assessment. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Moelis & Company', '2027 Investment Banking Summer Associate - Generalist - New York', 'summer_internship', 'us', 'New York', 'United States', 2027, 'open',
   '2026-12-13', 'https://moelis-careers.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-4/xf-ca8994077cb1/candidate/so/pm/1/pl/2/opp/398-2027-Investment-Banking-Summer-Associate-Generalist-New-York/en-GB',
   $q$10-week MBA Summer Associate programme in New York, generalist track. $175,000 prorated annual salary. For MBA students graduating Dec 2027-Jul 2028; apply to only one location. Requires Suited assessment. Sourced 28 Sept 2026.$q$,
   'unknown', true);
