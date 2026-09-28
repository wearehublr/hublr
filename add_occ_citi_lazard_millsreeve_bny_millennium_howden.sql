-- New opportunities added 28 Sept 2026, researched against companies flagged
-- by the founder as having recently opened UK/US roles. Cross-checked
-- against existing Hublr listings first; only genuinely new individual
-- postings are included here. Already applied directly to production via
-- the Supabase admin client - this file is kept for the repo's audit trail.

insert into public.opportunities (
  company, role_title, category, region, city, country, cycle_year,
  status, deadline, apply_url, notes, full_description, visa_sponsorship, sponsorship_verified_at,
  is_published
) values
(
  'OCC', 'Summer Intern - Diversity, Equity and Inclusion', 'summer_internship', 'us', 'Chicago', 'United States', 2027,
  'open', null, 'https://theocc.wd5.myworkdayjobs.com/en-US/careers/job/Chicago---125-S-Franklin/Summer-Intern---Diversity--Equity-and-Inclusion_REQ-4848',
  $q$12-week summer internship (Summer 2027) supporting OCC's DEI team - Employee Network Group admin, inclusive-communications content, and a new process-improvement project. Chicago, hybrid. Not eligible for visa sponsorship. Sourced 28 Sept 2026.$q$,
  $q$A Summer 2027 internship (approximately 12 weeks, May-Aug or June-Sept, up to 40 hrs/week) with OCC's Diversity, Equity & Inclusion team in Chicago, hybrid with a minimum of 3 days/week in-office (Tue/Wed anchor days). The intern supports Employee Network Group (ENG) administration, helps create inclusive-communications content such as newsletters and internal storytelling, and supports community/nonprofit partnerships. New for this cycle is a process-improvement project: documenting the DEI team's current workflows (ENG requests, intake, reporting cycles) and identifying ways to reduce manual effort, tied to the team's 2027 goal of incorporating more AI tooling. Open to students studying Communications, Marketing, Organizational Development/Change, Business, Liberal Arts, or social sciences; no technical skills required. Pay is $25.00/hour.$q$,
  'no', '2026-09-28', true
),
(
  'Citi', 'Citi Global Wealth, Summer Analyst, London - United Kingdom, 2027', 'summer_internship', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://jobs.citi.com/job/london/citi-global-wealth-summer-analyst-london-united-kingdom-2027/287/101076875920',
  $q$10-week Global Wealth (Private Banking) summer internship, London, starting June 2027. Rolling applications, apply as soon as possible. Sourced 28 Sept 2026.$q$,
  $q$A 10-week Summer Analyst internship in Citi Global Wealth (Private Banking), London, starting June 2027. Analysts rotate within Private Banking, supporting transactional services, building the client pipeline, and contributing to structured client solutions. Open to penultimate-year students of any degree discipline, with a 2:1 predicted or achieved. Citi reviews applications on a rolling basis, so early application is advised.$q$,
  'unknown', '2026-09-28', true
),
(
  'Citi', 'Banking, Commercial Banking, Full Time Analyst, London - United Kingdom 2027', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://jobs.citi.com/job/london/banking-commercial-banking-full-time-analyst-london-united-kingdom-2027/287/100996355040',
  $q$Full-time analyst programme in Citi Commercial Bank, London, starting July 2027. Rotational training plus mentorship. Sourced 28 Sept 2026.$q$,
  $q$A full-time Analyst programme in Citi Commercial Bank, London, for clients with $10 million to $3 billion+ in annual sales, starting July 2027. Covers credit and lending, cash management, FX, and capital markets, with rotational training and mentorship built into the programme.$q$,
  'unknown', '2026-09-28', true
),
(
  'Citi', 'Banking, Commercial Banking, Summer Analyst, London - United Kingdom 2027', 'summer_internship', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://jobs.citi.com/job/london/banking-commercial-banking-summer-analyst-london-united-kingdom-2027/287/100661681328',
  $q$10-week Commercial Banking summer internship, London, starting June 2027. Sourced 28 Sept 2026.$q$,
  $q$A 10-week Summer Analyst internship in Citi Commercial Bank, London, starting June 2027. Covers company and industry research, financial modelling, and support for commercial lending and portfolio management.$q$,
  'unknown', '2026-09-28', true
),
(
  'Citi', 'Banking, Corporate Banking, Placement Analyst, London - United Kingdom, 2027', 'off_cycle', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://jobs.citi.com/job/london/banking-corporate-banking-placement-analyst-london-united-kingdom-2027/287/100709896912',
  $q$6-month Corporate Banking placement, London, starting February 2027. The posting text states a 25 Sept application deadline, but the listing was itself posted 27 Sept - after that date - so treat that deadline as unreliable boilerplate and confirm directly before relying on it. Sourced 28 Sept 2026.$q$,
  $q$A 6-month Corporate Banking placement in Citi's London office, starting February 2027. Covers accounting and financial-statement analysis, cash-flow modelling, credit and risk analysis, and deal structuring. Note: the live posting text names a 25 September application deadline, but the posting's own "posted" date is 27 September, two days after that - this looks like leftover boilerplate from a reused job description rather than an accurate deadline, so it has been left blank here pending confirmation.$q$,
  'unknown', '2026-09-28', true
),
(
  'Citi', 'Banking, Financing, Summer Analyst, London - United Kingdom 2027', 'summer_internship', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://jobs.citi.com/job/london/banking-financing-summer-analyst-london-united-kingdom-2027/287/100386484336',
  $q$10-week Financing summer internship, London, starting June 2027. No stated deadline, rolling applications. Sourced 28 Sept 2026.$q$,
  $q$A 10-week Summer Analyst internship in Citi's Financing division, London, starting June 2027. Financing works with corporate and government clients on financing structures, blending investment-banking-style client work with markets exposure across derivatives, fixed income, and equity origination and execution. The posting states there is no deadline for applications, reviewed on a rolling basis.$q$,
  'unknown', '2026-09-28', true
),
(
  'Citi', 'Banking, Financing, Equity Capital Markets, Placement Analyst, London - United Kingdom 2027', 'off_cycle', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://jobs.citi.com/job/london/banking-financing-equity-capital-markets-placement-analyst-london-united-kingdom-2027/287/100479480576',
  $q$6-month Equity Capital Markets placement, London, starting January 2027. Sourced 28 Sept 2026.$q$,
  $q$A 6-month Placement Analyst role in Equity Capital Markets within Citi's Financing division, London, starting January 2027. Covers pitchbooks and execution for IPOs, accelerated equity offerings, and rights issues, working alongside the M&A, Financing and Debt Capital Markets teams.$q$,
  'unknown', '2026-09-28', true
),
(
  'Citi', 'Services - Full-Time Analyst, UK - London, 2027 (2026 Summer Intern Converts Only)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://jobs.citi.com/job/london/services-full-time-analyst-uk-london-2027-2026-summer-intern-converts-only/287/100771374032',
  $q$Full-time Services conversion role, London, for 2026 Citi Services summer interns only - not open to fresh applicants. Sourced 28 Sept 2026.$q$,
  $q$A full-time Analyst conversion role in Citi Services (cash management/trade finance, custody, fund administration), London, open only to candidates who completed Citi's 2026 Services Summer Analyst internship. Growing emphasis on AI and analytics tooling within the business.$q$,
  'unknown', '2026-09-28', true
),
(
  'Citi', 'Services - Summer Analyst, UK - London, 2027', 'summer_internship', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://jobs.citi.com/job/london/services-summer-analyst-uk-london-2027/287/100771374240',
  $q$10-week Citi Services summer internship, London. Sourced 28 Sept 2026.$q$,
  $q$A 10-week Summer Analyst internship in Citi Services, London. Involves market research, business-development materials, process optimisation, client data analysis, and some exposure to AI/ML tooling used within the business.$q$,
  'unknown', '2026-09-28', true
),
(
  'Lazard', '2027 London Financial Advisory Full-Time Analyst', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027,
  'open', '2026-10-18', 'https://icbpjb.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/LazardStudentCareers/job/6629',
  $q$Full-time Analyst programme in Financial Advisory, London (hybrid), starting late July 2027. Apply before 18 Oct 2026. Sourced 28 Sept 2026.$q$,
  $q$A full-time Analyst role in Lazard's Financial Advisory business (M&A, restructuring, capital advisory), London, hybrid, starting late July 2027. Analysts rotate into a sector or product team, working on financial modelling and client materials, and must pass FCA regulatory exams before joining their team. Open to final-year students and recent graduates expecting to graduate in 2027.$q$,
  'unknown', '2026-09-28', true
),
(
  'Lazard', '2027-2028 London Financial Advisory Industrial Placement', 'placement_year', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://icbpjb.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/LazardStudentCareers/job/6638',
  $q$12-month Financial Advisory industrial placement, London (hybrid), starting June 2027. Rolling applications. Sourced 28 Sept 2026.$q$,
  $q$A 12-month industrial placement embedded in a Financial Advisory sector or product team in London, hybrid, starting June 2027. Can lead to a full-time Analyst offer the following year. Open to current undergraduates taking a placement year, expecting to graduate in 2029.$q$,
  'unknown', '2026-09-28', true
),
(
  'Lazard', '2027 M&A Internship - Denmark Coverage Team, London', 'off_cycle', 'uk', 'London', 'United Kingdom', 2027,
  'open', '2026-10-30', 'https://icbpjb.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/LazardStudentCareers/job/6647',
  $q$6-month M&A internship on Lazard's new Denmark Coverage Team, based in the London office, starting January 2027. Requires fluent English and Danish. Apply before 30 Oct 2026. Sourced 28 Sept 2026.$q$,
  $q$A 6-month M&A internship, on-site in Lazard's London office, joining the firm's newly formed Denmark Coverage Team, starting January 2027. Requires fluency in both English and Danish - a language-gated Nordic desk role rather than a generalist London Financial Advisory internship.$q$,
  'unknown', '2026-09-28', true
),
(
  'Lazard', '2027 M&A Internship, Zurich', 'off_cycle', 'eu', 'Zurich', 'Switzerland', 2027,
  'open', '2026-10-16', 'https://icbpjb.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/LazardStudentCareers/job/6641',
  $q$10-12 week M&A internship in Zurich, starting April or July 2027. Requires English fluency plus conversational German. Apply before 16 Oct 2026. Sourced 28 Sept 2026.$q$,
  $q$A standard M&A analyst-track internship in Lazard's Zurich office, on-site, 10-12 weeks, starting April or July 2027. Requires fluent English plus conversational German.$q$,
  'unknown', '2026-09-28', true
),
(
  'Lazard', '2027 M&A Internship, Stockholm', 'off_cycle', 'eu', 'Stockholm', 'Sweden', 2027,
  'open', '2026-10-04', 'https://icbpjb.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/LazardStudentCareers/job/6507',
  $q$Rolling 3-month M&A internships in Stockholm, offered every quarter through 2027. Requires English fluency plus a Nordic language. Nearest intake's deadline 4 Oct 2026, further intakes follow on a rolling basis. Sourced 28 Sept 2026.$q$,
  $q$A 3-month M&A internship in Lazard's Stockholm office, on-site, offered on a rolling basis every quarter through 2027. Requires fluent English plus a Nordic language. The deadline shown is for the nearest upcoming intake; later quarters are expected to open on a rolling basis.$q$,
  'unknown', '2026-09-28', true
),
(
  'Mills & Reeve', 'Insight Event for Future Vacation Scheme Applicants - Manchester, 19 October', 'insight_program', 'uk', 'Manchester', 'United Kingdom', 2027,
  'open', '2026-10-05', 'https://apply.candidats.io/ca0b7f0c-fe8a-441f-9048-030f548e6464',
  $q$In-person insight event at Mills & Reeve's Manchester office, 19 Oct 2026, 16:30-18:30 BST, for prospective 2027 vacation scheme applicants. Registration deadline 5 Oct 2026. Sourced 28 Sept 2026.$q$,
  $q$An in-person insight event at Mills & Reeve's Manchester office for prospective vacation scheme applicants, featuring current trainees, lawyers and the emerging talent team. Covers what the firm looks for in applicants and how the recruitment process works. Attendance for the full session is required. 19 October 2026, 16:30-18:30 BST; registration closes 5 October 2026.$q$,
  'unknown', '2026-09-28', true
),
(
  'Mills & Reeve', 'Insight Event for Future Vacation Scheme Applicants - Birmingham, 29 October', 'insight_program', 'uk', 'Birmingham', 'United Kingdom', 2027,
  'open', '2026-10-15', 'https://apply.candidats.io/061385f8-ee8c-4173-a84a-afced419232d',
  $q$In-person insight event at Mills & Reeve's Birmingham office, 29 Oct 2026, 16:30-18:30 BST, for prospective 2027 vacation scheme applicants. Registration deadline 15 Oct 2026. Sourced 28 Sept 2026.$q$,
  $q$An in-person insight event at Mills & Reeve's Birmingham office for prospective vacation scheme applicants, same format as the firm's other insight events: current trainees, lawyers and the emerging talent team covering what the firm looks for and how recruitment works. 29 October 2026, 16:30-18:30 BST; registration closes 15 October 2026.$q$,
  'unknown', '2026-09-28', true
),
(
  'Mills & Reeve', 'Insight Event for Future Vacation Scheme Applicants - Leeds, 29 October', 'insight_program', 'uk', 'Leeds', 'United Kingdom', 2027,
  'open', '2026-10-15', 'https://apply.candidats.io/6c37d888-74d3-4691-91eb-f8fd377686c1',
  $q$In-person insight event at Mills & Reeve's Leeds office for prospective 2027 vacation scheme applicants. Registration deadline 15 Oct 2026. The posting's own title says 29 October but its body text says 19 October - a genuine inconsistency on Mills & Reeve's own page, so confirm the actual date directly before relying on it. Sourced 28 Sept 2026.$q$,
  $q$An in-person insight event at Mills & Reeve's Leeds office for prospective vacation scheme applicants, same format as the firm's other insight events. Note: the live posting's title states 29 October while its own body text states 19 October for the Leeds office - this discrepancy is on Mills & Reeve's own page, not resolved here, so double-check the actual date when registering. Registration closes 15 October 2026.$q$,
  'unknown', '2026-09-28', true
),
(
  'Mills & Reeve', 'Insight Event for Future Vacation Scheme Applicants - Virtual, 26 November', 'insight_program', 'uk', 'Virtual', 'United Kingdom', 2027,
  'open', '2026-11-12', 'https://apply.candidats.io/a8f00b84-f1fb-4b6b-abde-ecf792f4d573',
  $q$Virtual insight event for prospective 2027 vacation scheme applicants, 26 Nov 2026, 13:00-14:30 GMT. Registration deadline 12 Nov 2026. Sourced 28 Sept 2026.$q$,
  $q$A virtual insight event for prospective vacation scheme applicants, same format as Mills & Reeve's in-person sessions: current trainees, lawyers and the emerging talent team. 26 November 2026, 13:00-14:30 GMT; registration closes 12 November 2026.$q$,
  'unknown', '2026-09-28', true
),
(
  'Mills & Reeve', 'Insight Event for Future Apprenticeship Applicants - Virtual, 24 November', 'insight_program', 'uk', 'Virtual', 'United Kingdom', 2027,
  'open', '2026-11-10', 'https://apply.candidats.io/bd7d732c-5d7a-4192-8925-b71dad078bf0',
  $q$Virtual insight event for prospective solicitor degree apprenticeship applicants, 24 Nov 2026, 15:30-16:30 GMT. Registration deadline 10 Nov 2026. Sourced 28 Sept 2026.$q$,
  $q$A virtual insight event for prospective solicitor degree apprenticeship applicants, hearing from current apprentices, trainees and lawyers, with tips on standing out in the recruitment process. 24 November 2026, 15:30-16:30 GMT; registration closes 10 November 2026.$q$,
  'unknown', '2026-09-28', true
),
(
  'Mills & Reeve', 'Insight Event for Future Apprenticeship Applicants - Virtual, 12 January', 'insight_program', 'uk', 'Virtual', 'United Kingdom', 2027,
  'open', '2026-12-29', 'https://apply.candidats.io/7da1dc40-b509-4dae-97b5-c59debf1c1ea',
  $q$Virtual insight event for prospective solicitor degree apprenticeship applicants, 12 Jan 2027, 15:30-16:30 GMT. Registration deadline 29 Dec 2026. Sourced 28 Sept 2026.$q$,
  $q$A virtual insight event for prospective solicitor degree apprenticeship applicants, same format as Mills & Reeve's other apprenticeship insight session. 12 January 2027, 15:30-16:30 GMT; registration closes 29 December 2026.$q$,
  'unknown', '2026-09-28', true
),
(
  'Millennium Management', 'Compliance Analyst, London', 'entry_level', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://campusjobs.mlp.com/careers/job/755945162198',
  $q$Full-time (not internship) Compliance Analyst role, London, for candidates able to start full-time work in September 2026. Distinct from Millennium's existing Compliance Intern posting. Sourced 28 Sept 2026.$q$,
  $q$A full-time Compliance Analyst role at Millennium Management, London, distinct from the firm's internship programme. Requires a completed Bachelor's degree and availability to begin full-time work in September 2026. Millennium's own FAQ states its usual practice is to hire analysts from its internship programme, making this a comparatively rare direct full-time entry route into the firm.$q$,
  'unknown', '2026-09-28', true
),
(
  'Howden', 'Surety Graduate Programme 2027', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027,
  'open', '2026-10-13', 'https://hyperiongrp.wd3.myworkdayjobs.com/en-US/hyperion_external/job/London---One-Creechurch-Place/Surety-Graduate-Programme_R0019228-1',
  $q$Newly posted (within the last few days) 18-month Surety graduate programme, London, GBP 40,000, permanent from day one. Requires full and unrestricted right to work in the UK. Deadline 13 Oct 2026. Sourced 28 Sept 2026.$q$,
  $q$An 18-month structured graduate programme in Howden's Capital, Advisory and Placement team, working on surety bonds - helping clients secure guarantees for major contracts and projects. Permanent, full-time from day one, GBP 40,000 salary, hybrid (3-4 days in the office), starting September 2027. Requires full and unrestricted right to work in the UK (no visa sponsorship). Applications close 13 October 2026.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Delivery (Manchester)', 'grad_scheme', 'uk', 'Manchester', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82226/',
  $q$Full-time, 24-month rotational graduate programme, Delivery, Manchester. Distinct from BNY's existing summer/internship programme postings. No stated application deadline. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in Delivery, Manchester, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations designed to set analysts up from day one. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Audit (Manchester)', 'grad_scheme', 'uk', 'Manchester', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82277/',
  $q$Full-time, 24-month rotational graduate programme, Audit, Manchester. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in Audit, Manchester, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Audit (London)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82279/',
  $q$Full-time, 24-month rotational graduate programme, Audit, London. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in Audit, London, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Investments (London)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82278/',
  $q$Full-time, 24-month rotational graduate programme, Investments, London. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in Investments, London, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Engineering (Developer) (Manchester)', 'grad_scheme', 'uk', 'Manchester', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82296/',
  $q$Full-time, 24-month rotational graduate programme, Engineering (Developer), Manchester. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in Engineering (Developer), Manchester, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Engineering (Data Science) (Manchester)', 'grad_scheme', 'uk', 'Manchester', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82295/',
  $q$Full-time, 24-month rotational graduate programme, Engineering (Data Science), Manchester. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in Engineering (Data Science), Manchester, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Client Service (London)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82221/',
  $q$Full-time, 24-month rotational graduate programme, Client Service, London. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in Client Service, London, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Client Service (Manchester)', 'grad_scheme', 'uk', 'Manchester', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82222/',
  $q$Full-time, 24-month rotational graduate programme, Client Service, Manchester. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in Client Service, Manchester, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Office of the CFO (London)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82282/',
  $q$Full-time, 24-month rotational graduate programme, Office of the CFO, London. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in the Office of the CFO, London, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Office of the CFO (Manchester)', 'grad_scheme', 'uk', 'Manchester', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82284/',
  $q$Full-time, 24-month rotational graduate programme, Office of the CFO, Manchester. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in the Office of the CFO, Manchester, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Risk and Compliance (London)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82270/',
  $q$Full-time, 24-month rotational graduate programme, Risk and Compliance, London. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in Risk and Compliance, London, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Risk and Compliance (Manchester)', 'grad_scheme', 'uk', 'Manchester', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82274/',
  $q$Full-time, 24-month rotational graduate programme, Risk and Compliance, Manchester. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in Risk and Compliance, Manchester, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Client Coverage (London)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82212/',
  $q$Full-time, 24-month rotational graduate programme, Client Coverage, London. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in Client Coverage, London, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Client Coverage (Manchester)', 'grad_scheme', 'uk', 'Manchester', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82215/',
  $q$Full-time, 24-month rotational graduate programme, Client Coverage, Manchester. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in Client Coverage, Manchester, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Credit & Lending (London)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82219/',
  $q$Full-time, 24-month rotational graduate programme, Credit & Lending, London. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in Credit & Lending, London, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Product Management (London)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82224/',
  $q$Full-time, 24-month rotational graduate programme, Product Management, London. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in Product Management, London, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Office of the COO (Manchester)', 'grad_scheme', 'uk', 'Manchester', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82267/',
  $q$Full-time, 24-month rotational graduate programme, Office of the COO, Manchester. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in the Office of the COO, Manchester, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
),
(
  'BNY Mellon', '2027 BNY Analyst Program - Office of the COO (London)', 'grad_scheme', 'uk', 'London', 'United Kingdom', 2027,
  'open', null, 'https://eofe.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/BNY-Careers/jobs/preview/82271/',
  $q$Full-time, 24-month rotational graduate programme, Office of the COO, London. Sourced 28 Sept 2026.$q$,
  $q$A 24-month rotational Analyst Program in the Office of the COO, London, part of BNY's 2027 graduate cohort. Full-time, with structured induction, mentorship, and cross-practice rotations. Open to candidates with a 2:1 or above, graduating December 2026 or Summer 2027. Not eligible for visa sponsorship.$q$,
  'no', '2026-09-28', true
);

insert into public.events (
  company, title, description, event_type, event_date, location_type, location,
  registration_url, source_url, deadline, is_published
) values
(
  'Lazard',
  'Meet Lazard Madrid - Women in Finance',
  $q$An in-person event at Lazard's Madrid office: an introduction to the firm, a case study, and an introduction to the Off-Cycle internship application process, followed by an informal Q&A and networking breakfast nearby. Listed as an "Invite Only" category on Lazard's own careers portal, though registration is open via the portal itself.$q$,
  'networking',
  '2026-10-15T08:15:00+02:00',
  'in_person',
  'Lazard Madrid office, C. de Rafael Calvo 39, Chamberi, 28010 Madrid',
  'https://icbpjb.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/LazardStudentCareers/events/110002',
  'https://icbpjb.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/LazardStudentCareers/events/110002',
  '2026-10-08',
  true
);
