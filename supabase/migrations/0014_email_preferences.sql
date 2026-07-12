-- Lets students opt out of tracker emails (applied-confirmation, deadline
-- reminders). Defaults to true since these are emails about the student's
-- own tracked opportunities, not marketing.

alter table public.profiles
  add column if not exists email_notifications_enabled boolean not null default true;
