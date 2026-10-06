-- New opportunities added 6 Oct 2026.
-- Founder said Standard Chartered had opened new early-career roles. 8 rows
-- were tracked (all summer internships, UK/France/US). Checked
-- jobs.standardchartered.com (its Early Careers feed, paged in full, plus
-- keyword searches) and found 10 new UK/EU/US roles: 4 US summer
-- internships, 2 Frankfurt summer internships, and 4 graduate programmes
-- (London x2, New York x2). The London M&A graduate programme closes
-- 30 Oct 2026. Most other postings show a 31 Dec 2026 posting-end date.
-- No UK/EU/US apprenticeships, spring/insight weeks or placement roles are
-- live. Also confirmed the 2 existing Paris internship pages now say "not
-- available" and marked those rows closed (update at the end).
-- Already applied directly to production via the Supabase admin client -
-- this file is kept for the repo's audit trail.

insert into public.opportunities
  (company, role_title, category, region, city, country, cycle_year, status,
   deadline, apply_url, notes, visa_sponsorship, is_published)
values
  ('Standard Chartered', 'Client Coverage Internship Programme US 2027', 'summer_internship', 'us', 'New York', 'United States', 2027, 'open',
   '2026-12-31', 'https://jobs.standardchartered.com/job/Client-Coverage-Internship-Programme-US-2027/57304-en_GB',
   $q$Corporate & Commercial Banking: work in the client-facing arm of CIB supporting corporates, financial institutions, investors and public sector clients, helping deliver integrated banking solutions and build client relationships. 10-week summer internship starting June 2027, for penultimate-year students who can intern in June 2027 and start full-time in July 2028. Assessment centres run from October 2026, so apply early. Requires permanent legal right to work; one application per 6 months. Standard Chartered says it considers candidates needing visa sponsorship for UK and UAE roles only. Posting ends 31/12/2026. Sourced 6 Oct 2026.$q$,
   'no', true),
  ('Standard Chartered', 'Transaction Services Internship Programme US 2027', 'summer_internship', 'us', 'New York', 'United States', 2027, 'open',
   '2026-12-31', 'https://jobs.standardchartered.com/job/Transaction-Services-Internship-Programme-US-2027/57310-en_GB',
   $q$Transaction Banking: work on cash management, trade and supply chain finance and digital banking solutions that help clients optimise liquidity and manage risk across borders. 10-week summer internship starting June 2027, for penultimate-year students who can intern in June 2027 and start full-time in July 2028. Assessment centres run from October 2026, so apply early. Requires permanent legal right to work; one application per 6 months. Standard Chartered says it considers candidates needing visa sponsorship for UK and UAE roles only. Posting ends 31/12/2026. Sourced 6 Oct 2026.$q$,
   'no', true),
  ('Standard Chartered', 'Strategic Solutions & Advisory Internship Programme US 2027', 'summer_internship', 'us', 'New York', 'United States', 2027, 'open',
   '2026-12-31', 'https://jobs.standardchartered.com/job/Strategic-Solutions-&-Advisory-Internship-Programme-US-2027/57311-en_GB',
   $q$Corporate & Commercial Banking: global advisory platform within CIB advising on capital structure and rating, transition finance and Islamic banking across sectors and regions. 10-week summer internship starting June 2027, for penultimate-year students who can intern in June 2027 and start full-time in July 2028. Assessment centres run from October 2026, so apply early. Requires permanent legal right to work; one application per 6 months. Standard Chartered says it considers candidates needing visa sponsorship for UK and UAE roles only. Posting ends 31/12/2026. Sourced 6 Oct 2026.$q$,
   'no', true),
  ('Standard Chartered', 'Markets Intern US 2027', 'summer_internship', 'us', 'New York', 'United States', 2027, 'open',
   '2026-12-31', 'https://jobs.standardchartered.com/job/Markets-Intern-US-2027/61049-en_GB',
   $q$Financial Markets: help clients manage risk across FX, rates, debt securities and commodities. 10-week summer internship starting June 2027, for penultimate-year students who can intern in June 2027 and start full-time in July 2028. Assessment centres run from October 2026, so apply early. Requires permanent legal right to work; one application per 6 months. Posting ends 31/12/2026. Sourced 6 Oct 2026.$q$,
   'unknown', true),
  ('Standard Chartered', 'Coverage Banking Intern Germany 2027', 'summer_internship', 'eu', 'Frankfurt', 'Germany', 2027, 'open',
   '2026-12-31', 'https://jobs.standardchartered.com/job/Coverage-Banking%C2%A0Intern-Germany-2027/59161-en_GB',
   $q$Corporate & Commercial Banking: client-facing CIB role supporting corporates, financial institutions and public sector clients. 10-week summer internship starting June 2027, for penultimate-year students who can intern in June 2027 and start full-time in July 2028. Assessment centres run from October 2026, so apply early. Requires permanent legal right to work; one application per 6 months. Posting ends 31/12/2026. Sourced 6 Oct 2026.$q$,
   'unknown', true),
  ('Standard Chartered', 'Transaction Services Intern Germany 2027', 'summer_internship', 'eu', 'Frankfurt', 'Germany', 2027, 'open',
   '2026-12-31', 'https://jobs.standardchartered.com/job/Transaction-Services-Intern-Germany-2027/59163-en_GB',
   $q$Transaction Banking: cash management, trade finance and digital banking solutions. 10-week summer internship starting June 2027, for penultimate-year students who can intern in June 2027 and start full-time in July 2028. Assessment centres run from October 2026, so apply early. Requires permanent legal right to work; one application per 6 months. Posting ends 31/12/2026. Sourced 6 Oct 2026.$q$,
   'unknown', true),
  ('Standard Chartered', 'Syndicate and Portfolio Management Graduate Programme 2027', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'open',
   '2026-12-31', 'https://jobs.standardchartered.com/job/Syndicate-and-Portfolio-Management%E2%80%AFGraduate-Programme-2027/60475-en_GB',
   $q$Corporate & Commercial Banking (CIB): see how large-scale financing is structured, distributed and managed, with placements in Credit Portfolio Analytics, Credit Portfolio Management or Syndicate and Financing Risk. Open to all degree disciplines. 2-year graduate programme (Band 7) starting July 2027, for final-year students graduating by July 2027. Assessment centres run from October 2026, so apply early. Requires permanent legal right to work. Posting ends 31/12/2026. Sourced 6 Oct 2026.$q$,
   'unknown', true),
  ('Standard Chartered', 'Mergers & Acquisitions Corporate & Investment Banking Graduate Programme 2027 - London', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'open',
   '2026-10-30', 'https://jobs.standardchartered.com/job/Mergers-&-Acquisitions-Corporate-&-Investment-Banking-Graduate-Programme-2027/60484-en_GB',
   $q$Join the M&A Advisory Group on live deals covering mergers, acquisitions, divestitures, restructurings and capital raising, working with bankers and coverage partners. Closes 30 Oct 2026. 2-year graduate programme (Band 7) starting July 2027, for final-year students graduating by July 2027. Assessment centres run from October 2026, so apply early. Requires permanent legal right to work. Posting ends 30/10/2026. Sourced 6 Oct 2026.$q$,
   'unknown', true),
  ('Standard Chartered', 'Mergers & Acquisitions Corporate & Investment Banking Graduate Programme 2027 - New York', 'grad_scheme', 'us', 'New York', 'United States', 2027, 'open',
   '2026-12-31', 'https://jobs.standardchartered.com/job/Mergers-&-Acquisitions-Corporate-&-Investment-Banking-Graduate-Programme-2027/60641-en_GB',
   $q$Join the M&A Advisory Group on live deals covering mergers, acquisitions, divestitures, restructurings and capital raising, working with bankers and coverage partners. 2-year graduate programme (Band 7) starting July 2027, for final-year students graduating by July 2027. Assessment centres run from October 2026, so apply early. Requires permanent legal right to work. Posting ends 31/12/2026. Sourced 6 Oct 2026.$q$,
   'unknown', true),
  ('Standard Chartered', 'Financial Markets Graduate Programme 2027', 'grad_scheme', 'us', 'New York', 'United States', 2027, 'open',
   '2026-12-31', 'https://jobs.standardchartered.com/job/Financial-Markets-Graduate-Programme-2027/61814-en_GB',
   $q$Financial Markets: help clients navigate complexity and manage risk across FX, rates, debt securities and commodities. 2-year graduate programme (Band 7) starting July 2027, for final-year students graduating by July 2027. Assessment centres run from October 2026, so apply early. Requires permanent legal right to work. Posting ends 31/12/2026. Sourced 6 Oct 2026.$q$,
   'unknown', true);

-- Existing Paris rows no longer available on the Standard Chartered jobs site.
update public.opportunities
set status = 'closed'
where id in (
  '18e49970-11eb-42a8-a506-bbecfcfb327b', -- Transaction Services Intern France 2027
  '34fab1e0-717d-4ab9-b73a-d3172ef94842'  -- Coverage Banking Intern France 2027
);
