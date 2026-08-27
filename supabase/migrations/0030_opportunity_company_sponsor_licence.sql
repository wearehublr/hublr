-- Whether the employer (as a legal entity) holds a UK Skilled Worker /
-- Temporary Worker sponsor licence at all, per the Home Office's public
-- register. This is a company-level fact, distinct from visa_sponsorship
-- (which is what a specific posting says about that specific role) --
-- used only as a fallback when visa_sponsorship is 'unknown'. See
-- src/lib/eligibility.ts for how the two combine.
--
-- true = confirmed on the register, false = confirmed absent,
-- null = not yet checked.

alter table public.opportunities
  add column if not exists company_sponsor_licence boolean;
