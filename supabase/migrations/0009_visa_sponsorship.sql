-- Whether an opportunity is known to sponsor visas, so international
-- students can filter for it. Three states because most listings' visa
-- policy is genuinely unconfirmed, not a real "no".

alter table public.opportunities
  add column if not exists visa_sponsorship text not null default 'unknown'
    check (visa_sponsorship in ('yes', 'no', 'unknown'));
