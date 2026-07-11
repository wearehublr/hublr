-- Tracks which deadline reminder milestones have already been emailed for
-- a tracked application, so the daily cron never double-sends.

alter table public.applications
  add column if not exists reminder_7d_sent boolean not null default false,
  add column if not exists reminder_3d_sent boolean not null default false,
  add column if not exists reminder_0d_sent boolean not null default false;
