-- When an admin last made (or re-confirmed) a sponsorship determination for
-- this specific role, so the public sponsorship badge can show "Last
-- verified: <date>" instead of leaving users to guess how current the
-- data is. Only meaningful for a determined status (visa_sponsorship
-- 'yes'/'no', or company_sponsor_licence true/false) - there is nothing to
-- date for "not confirmed", since nothing has actually been verified there.
--
-- Backfilled from updated_at as a best-effort estimate for existing rows
-- that already carry a determination; from here on the admin actions set
-- it explicitly whenever a sponsorship field changes or is re-confirmed.
alter table public.opportunities
  add column if not exists sponsorship_verified_at timestamptz;

update public.opportunities
set sponsorship_verified_at = updated_at
where sponsorship_verified_at is null
  and (visa_sponsorship in ('yes', 'no') or company_sponsor_licence is not null);
