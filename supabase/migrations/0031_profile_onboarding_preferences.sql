-- First-run onboarding preferences: role type and region the student is
-- looking for (mirrors interested_industries: array, default '{}', no
-- implied "unset" state), plus a direct visa-sponsorship-need answer.
--
-- requires_sponsorship is asked directly rather than derived purely from
-- citizenship/visa_status, because most students answer "do I need a
-- visa sponsor?" faster than picking through a citizenship/visa-status
-- form. The app still pre-fills a sensible default from citizenship/
-- visa_status when those are already known (UK/Irish citizen or ILR =>
-- no; any other visa => yes), but the stored answer is the student's own.
--
-- onboarding_completed_at gates the one-time first-run flow: null means
-- "hasn't gone through it yet," distinct from having answered "no" to
-- everything.

alter table public.profiles
  add column if not exists preferred_categories text[] not null default '{}',
  add column if not exists preferred_regions text[] not null default '{}',
  add column if not exists requires_sponsorship boolean,
  add column if not exists onboarding_completed_at timestamptz;
