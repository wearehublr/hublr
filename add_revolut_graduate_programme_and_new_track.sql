-- New opportunities added 28 Sept 2026.
-- Founder asked to check the 8 companies from the carousel-deck project for
-- new roles. Revolut had 12 rows tracked (all "Internship Programme 2027"
-- tracks). Found:
--  1. A 13th Internship Programme track (Technology Services Specialist)
--     not previously tracked.
--  2. An entirely separate, untracked "Graduate Programme 2027" cohort
--     (12-month scheme for people who've already graduated, distinct from
--     the Internship Programme): 11 core tracks mirroring most internship
--     tracks, plus 8 market-specific "Graduate Sales Executive" roles.
-- Also: the existing "Internship Programme 2027 - Data Scientist and
-- Analyst" row was confirmed no longer live on revolut.com/careers and was
-- marked closed (separate update, not in this insert).
-- Verified directly on revolut.com/careers (their own domain, JS-rendered
-- but fully browsable) - not aggregator/search-summary data.
-- Already applied directly to production via the Supabase admin client -
-- this file is kept for the repo's audit trail.

insert into public.opportunities
  (company, role_title, category, region, city, country, cycle_year, status,
   deadline, apply_url, notes, visa_sponsorship, is_published)
values
  ('Revolut', 'Internship Programme 2027 - Technology Services Specialist (IT Systems Engineer)', 'summer_internship', 'eu', null, null, 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/internship-programme-2027-technology-services-specialist-it-systems-engineer-d3aa1ba8-5e1a-4802-bc4d-d1327cb49ab5/',
   $q$10-week paid summer internship on Revolut's Technology team supporting IT systems, enterprise device management (macOS/Windows/ChromeOS/mobile), software deployments, and scripting/automation. For penultimate-year STEM students graduating 2028. Applications open from June 2026, recruitment July-Dec 2026, programme starts June/July 2027, rolling basis. Multi-location role (Barcelona/Dubai/Krakow/Lisbon/Madrid and others) - no London option, unlike most of Revolut's other 2027 tracks. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Programme 2027 - Software Engineer (Java)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-programme-2027-software-engineer-java-3b79c804-b7e0-4b1a-9ef6-2fd69723dc7a/',
   $q$12-month Graduate Programme (distinct from the Internship Programme), for candidates who graduated 2025/2026/2027 with a predicted/achieved 2:1. Applications open from May 2026, recruitment July-Dec 2026, programme starts early or late 2027, rolling basis. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Programme 2027 - Software Engineer (Android)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-programme-2027-software-engineer-android-dc268c11-5ef2-4398-8fe7-6e89dc8aebee/',
   $q$12-month Graduate Programme (distinct from the Internship Programme), for candidates who graduated 2025/2026/2027 with a predicted/achieved 2:1. Applications open from May 2026, recruitment July-Dec 2026, programme starts early or late 2027, rolling basis. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Programme 2027 - Software Engineer (iOS)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-programme-2027-software-engineer-i-os-726455bb-b707-4798-831d-253f7c8773de/',
   $q$12-month Graduate Programme (distinct from the Internship Programme), for candidates who graduated 2025/2026/2027 with a predicted/achieved 2:1. Applications open from May 2026, recruitment July-Dec 2026, programme starts early or late 2027, rolling basis. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Programme 2027 - Software Engineer (Python)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-programme-2027-software-engineer-python-f3f6861d-2013-4a52-b95f-15e44a73625f/',
   $q$12-month Graduate Programme (distinct from the Internship Programme), for candidates who graduated 2025/2026/2027 with a predicted/achieved 2:1. Applications open from May 2026, recruitment July-Dec 2026, programme starts early or late 2027, rolling basis. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Programme 2027 - Software Engineer (Frontend)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-programme-2027-software-engineer-frontend-90f8f44d-d656-4c74-a6a5-a470b858179d/',
   $q$12-month Graduate Programme (distinct from the Internship Programme), for candidates who graduated 2025/2026/2027 with a predicted/achieved 2:1. Applications open from May 2026, recruitment July-Dec 2026, programme starts early or late 2027, rolling basis. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Programme 2027 - Strategy & Operations Manager', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-programme-2027-strategy-operations-manager-f95a2dda-30a6-4fef-af87-db97199df832/',
   $q$12-month Graduate Programme (distinct from the Internship Programme), for candidates who graduated 2025/2026/2027 with a predicted/achieved 2:1. Applications open from May 2026, recruitment July-Dec 2026, programme starts early or late 2027, rolling basis. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Programme 2027 - Product Owner (UX)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-programme-2027-product-owner-ux-48244271-6656-42f9-ab2c-caf4531593d3/',
   $q$12-month Graduate Programme (distinct from the Internship Programme), for candidates who graduated 2025/2026/2027 with a predicted/achieved 2:1. Applications open from May 2026, recruitment July-Dec 2026, programme starts early or late 2027, rolling basis. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Programme 2027 - Product Owner (Technical)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-programme-2027-product-owner-technical-554c4b14-c988-4c35-bd06-702acf4f36f7/',
   $q$12-month Graduate Programme (distinct from the Internship Programme), for candidates who graduated 2025/2026/2027 with a predicted/achieved 2:1. Applications open from May 2026, recruitment July-Dec 2026, programme starts early or late 2027, rolling basis. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Programme 2027 - Product Designer', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-programme-2027-product-designer-6487c60b-fff9-4519-aa1d-f5c6b26f7602/',
   $q$12-month Graduate Programme (distinct from the Internship Programme), for candidates who graduated 2025/2026/2027 with a predicted/achieved 2:1. Applications open from May 2026, recruitment July-Dec 2026, programme starts early or late 2027, rolling basis. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Programme 2027 - Information Security Engineer (AppSec)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-programme-2027-information-security-engineer-appsec-19f09e6a-bb74-41bb-819c-bcdff217385f/',
   $q$12-month Graduate Programme (distinct from the Internship Programme), for candidates who graduated 2025/2026/2027 with a predicted/achieved 2:1. Applications open from May 2026, recruitment July-Dec 2026, programme starts early or late 2027, rolling basis. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Programme 2027 - Technology Services Specialist (IT Systems Engineer)', 'grad_scheme', 'eu', null, null, 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-programme-2027-technology-services-specialist-it-systems-engineer-46dcb894-2592-4385-9bd7-ce4f632b4c47/',
   $q$12-month Graduate Programme (distinct from the Internship Programme), for candidates who graduated 2025/2026/2027 with a predicted/achieved 2:1. Applications open from May 2026, recruitment July-Dec 2026, programme starts early or late 2027, rolling basis. Multi-location role (Barcelona/Dubai/Krakow/Lisbon/Madrid and others) - no London option, unlike most of Revolut's other 2027 tracks. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Sales Executive - Nordic Market', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-sales-executive-nordic-market-18c91eff-9057-4af6-995e-8036e8ba160f/',
   $q$Graduate Sales Programme: sales bootcamp followed by working directly with Revolut Business clients in the Nordic market. Requires fluent English plus Danish/Finnish/Norwegian/Swedish. For 2024/2025/2026 graduates. Rolling basis, no fixed deadline. Offices: Barcelona/Dublin/Lisbon/London/Madrid. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Sales Executive - German Market', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-sales-executive-german-market-dbe7744d-de38-461a-8bfa-663c6dcc315f/',
   $q$Graduate Sales Programme: sales bootcamp followed by working directly with Revolut Business clients in the German market. Requires fluent English and German. For 2024/2025/2026 graduates. Rolling basis, no fixed deadline. Offices: Barcelona/Dublin/Krakow/London/Madrid. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Sales Executive - Benelux Market', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-sales-executive-benelux-market-5d43494c-7659-4e8a-bed9-95cb92a33638/',
   $q$Graduate Sales Programme: sales bootcamp followed by working directly with Revolut Business clients in the Benelux market. Requires fluent English plus Dutch/French. For 2024/2025/2026 graduates. Rolling basis, no fixed deadline. Offices: Barcelona/Dublin/Lisbon/London/Madrid. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Sales Executive - Hungarian Market', 'grad_scheme', 'eu', null, null, 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-sales-executive-hungarian-market-db136d1d-68de-4e14-b2ec-51b44cd6ed12/',
   $q$Graduate Sales Programme: sales bootcamp followed by working directly with Revolut Business clients in the Hungarian market. Requires fluent English and Hungarian. For 2024/2025/2026 graduates. Rolling basis, no fixed deadline. Offices: Barcelona/Dublin/Krakow/Lisbon/Madrid - no London option. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Sales Executive - Slovenian Market', 'grad_scheme', 'eu', null, null, 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-sales-executive-slovenian-market-4b60f4b2-ab30-4ffe-b4e4-922472c37cbf/',
   $q$Graduate Sales Programme: sales bootcamp followed by working directly with Revolut Business clients in the Slovenian market. Requires fluent English and Slovenian. For 2024/2025/2026 graduates. Rolling basis, no fixed deadline. Offices: Barcelona/Dublin/Madrid - no London option. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Sales Executive - Polish Market', 'grad_scheme', 'eu', null, null, 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-sales-executive-polish-market-45c654e9-3e08-4216-af1b-20fc7a1c66f5/',
   $q$Graduate Sales Programme: sales bootcamp followed by working directly with Revolut Business clients in the Polish market. Requires fluent English and Polish. For 2024/2025/2026 graduates. Rolling basis, no fixed deadline. Offices: Bucharest/Lisbon/Madrid - no London option. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Sales Executive - Czech/Slovak Market', 'grad_scheme', 'eu', null, null, 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-sales-executive-czech-slovak-market-9a700216-0aac-4f14-80da-7ec53ede2b8a/',
   $q$Graduate Sales Programme: sales bootcamp followed by working directly with Revolut Business clients in the Czech/Slovak market. Requires fluent English and Czech or Slovak. For 2024/2025/2026 graduates. Rolling basis, no fixed deadline. Offices: Barcelona/Dublin/Lisbon/Madrid - no London option. Sourced 28 Sept 2026.$q$,
   'unknown', true),
  ('Revolut', 'Graduate Sales Executive - Swiss Market', 'grad_scheme', 'eu', null, null, 2027, 'rolling',
   null, 'https://www.revolut.com/careers/position/graduate-sales-executive-swiss-market-685b9b68-0199-4c3d-9f8c-0cadc7e1c51a/',
   $q$Graduate Sales Programme: sales bootcamp followed by working directly with Revolut Business clients in the Swiss market. Requires fluent English plus German/French/Italian. For 2024/2025/2026 graduates. Rolling basis, no fixed deadline. Offices: Barcelona/Dublin/Madrid/Paris - no London option. Sourced 28 Sept 2026.$q$,
   'unknown', true);

-- Mark the now-delisted Internship Programme 2027 Data Scientist and
-- Analyst track as closed - confirmed removed from the live site.
update public.opportunities
set status = 'closed',
    notes = $q$No longer listed on revolut.com/careers as of 28 Sept 2026 - appears to have been swapped out of the 2027 Internship Programme lineup. Sourced 28 Sept 2026.$q$
where company = 'Revolut' and role_title ilike '%Data Scientist and Analyst%';
