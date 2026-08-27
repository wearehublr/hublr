-- Citizenship/visa status on the profile, so an opportunity's existing
-- visa_sponsorship field can be compared against the student's own status
-- to compute a personalized eligibility verdict (see src/lib/eligibility.ts).
-- All nullable, no default: "not yet answered" must stay distinguishable
-- from any real value so the UI knows when to show no badge at all.

alter table public.profiles
  add column if not exists citizenship text check (citizenship in ('uk', 'irish', 'other')),
  add column if not exists visa_status text check (
    visa_status in ('none', 'student_visa', 'graduate_visa', 'skilled_worker_visa', 'spouse_visa', 'ilr_settled', 'other')
  ),
  add column if not exists visa_expiry date;
