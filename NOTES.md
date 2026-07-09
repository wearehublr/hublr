# Deferred work (not built yet)

## Email deadline reminders
`/dashboard` shows an in-app "upcoming deadlines" widget today. Actual emails aren't sent. To add them:

- Sign up for an email service (e.g. [Resend](https://resend.com), free tier) and add its API key as an env var.
- Add a Vercel Cron job (a route handler + a schedule in `vercel.json`) that runs daily, queries `applications` where `deadline` is within N days and `reminder_sent_at` is null, emails the user, and sets `reminder_sent_at` so they aren't emailed twice. The `reminder_sent_at` column already exists on `applications` for this.

## Auto-discovery of new opportunities
The `opportunities` table already has `source_url` and `discovered_via` (`manual` | `auto`) columns, plus `is_published`, so a future scraper could insert candidate rows with `discovered_via: 'auto'`, `is_published: false` for the admin to review on `/admin` before they go live. Not built — admin entry is manual only for now.

## In-browser CV/cover letter editing
`/documents` only supports uploading and managing files (PDF/DOCX) — there's no rich-text editor for writing or tweaking content directly in the app.

## Branding
Styling is intentionally neutral (no logo/brand colors were supplied). Swap in Job Seeker Hub branding in `src/app/components/NavBar.tsx` and `globals.css` whenever assets are ready.
