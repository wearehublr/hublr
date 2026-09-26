@AGENTS.md

# Emailing existing users in bulk

Never send a one-off email to many existing users by looping over them and
calling `sendEmail()` (src/lib/email.ts) once per recipient, even for a
one-time announcement or re-engagement send. That path has no engagement
tracking, no audience/unsubscribe management, and leaves no record in this
repo of what was sent or to whom - it happened once already (a "Welcome to
Hublr!" resend to the existing user base, September 2026) and there is no
way to answer basic questions about it after the fact (who received it, did
they open it, did they click through) because it bypassed Resend's own
reporting.

Any send to more than a handful of existing users must go through Resend's
Broadcast feature (Audience + Broadcast, resend.com/broadcasts) instead,
which is built for exactly this and keeps opens/clicks/unsubscribes
queryable afterward. The automatic per-user triggers already in this app
(e.g. the welcome email on first confirmation in
src/app/auth/callback/route.ts) are fine as-is - this only applies to a
deliberate one-time send to an existing list.
