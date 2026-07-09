# Hublr — Early Career Platform

Hublr helps students and early career professionals secure internships, grad roles, and more. The platform is built around six pillars:

- `/opportunities/2027`, `/opportunities/2026` — see which roles are live and their deadlines. Public, filterable by region, category, industry, status, and search. Logged-in users can "Track" a listing into their own pipeline.
- `/events` — early career and networking events (workshops, panels, career fairs), public and filterable.
- `/interview-prep` — curated interview prep resources: free newsletter links and paid guides.
- `/dashboard` — a logged-in user's personal **application tracker**: upcoming-deadline widget, applications grouped by stage, manual add.
- `/documents` — a logged-in user's **CV** and **cover letter** manager, grouped into their own sections; attach a specific version to any tracked application.
- `/book` — book a meeting (embeds a Calendly link).

Plus:
- `/signup`, `/login`, `/reset-password` — anyone can create an account.
- `/admin`, `/admin/events`, `/admin/interview-prep` — restricted to the single admin account (set via `ADMIN_EMAIL`). Quick-add forms plus edit/delete/publish for all curated content.

## Stack

Next.js (App Router) + Tailwind CSS, backed by Supabase (Postgres + Auth + Storage), deployed on Vercel.

## One-time setup

### 1. Create accounts (all free tier)

1. **GitHub** — [github.com/signup](https://github.com/signup). This holds the code and is what Vercel deploys from.
2. **Supabase** — [supabase.com](https://supabase.com), sign up, then "New project". Note the database password you set.
3. **Vercel** — [vercel.com/signup](https://vercel.com/signup), sign up with your GitHub account so it can access your repos.

### 2. Set up the Supabase project

1. In the Supabase dashboard, open **SQL Editor** → **New query**, paste the contents of [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql), and run it. This creates the `opportunities` table and its access rules.
2. Open a **New query** again, paste the contents of [`supabase/migrations/0002_users_and_tracking.sql`](supabase/migrations/0002_users_and_tracking.sql), and run it. This creates the `applications` and `documents` tables, their access rules, and a private storage bucket for uploaded files — no separate "create bucket" step needed.
3. Open a **New query** again, paste the contents of [`supabase/migrations/0003_events_interview_prep_and_admin_rls_fix.sql`](supabase/migrations/0003_events_interview_prep_and_admin_rls_fix.sql), and run it. This creates the `events` and `interview_resources` tables, and introduces a proper `admins` table (see "Security note" below — run this even if you set the project up before this file existed).
4. Go to **Authentication → Users → Add user**, and create yourself as the one admin account (email + password, with **Auto Confirm User** turned on). This is the only account that can log into `/admin`. Everyone else signs up themselves through `/signup`.
5. Back in **SQL Editor**, run this once (with your own email) to grant that account admin rights at the database level, not just in the app:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'you@example.com'
   on conflict do nothing;
   ```
6. Go to **Project Settings → API** (or **Data API**). You'll need:
   - **Project URL**
   - **anon public** key

### 3. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
cp .env.local.example .env.local
```

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from step 2 above.
- `ADMIN_EMAIL` — the email address of the admin account you created in step 2.4. Whoever logs in with this email sees the `/admin` links and can manage all curated content; everyone else only sees their own dashboard/documents. This must match the email you used in the `insert into public.admins` step too.
- `NEXT_PUBLIC_CALENDLY_URL` — your Calendly (or similar) link, shown on `/book`. Change it any time without touching code.

### 4. Run locally

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### 5. Push to GitHub and deploy on Vercel

1. Create a new empty repo on GitHub, then push this project to it.
2. In Vercel, "Add New Project" → import that GitHub repo.
3. In the Vercel project's **Settings → Environment Variables**, add the same variables from `.env.local`.
4. Deploy. Every future push to the main branch redeploys automatically.

## Data model

- [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) — the curated `opportunities` table (admin-managed, publicly readable when published).
- [`supabase/migrations/0002_users_and_tracking.sql`](supabase/migrations/0002_users_and_tracking.sql) — per-user `applications` and `documents` tables, plus the private `documents` storage bucket. Every row is scoped to `auth.uid()` via Row Level Security, so users can only ever see or change their own data.
- [`supabase/migrations/0003_events_interview_prep_and_admin_rls_fix.sql`](supabase/migrations/0003_events_interview_prep_and_admin_rls_fix.sql) — curated `events` and `interview_resources` tables (same admin-managed shape as `opportunities`), plus a real `admins` table.

### Security note

`0001` and `0002` predate open signup and gate admin writes only at the app layer (`ADMIN_EMAIL` checks in server actions) — the database itself trusted any logged-in user. `0003` closes that gap with a proper `admins` table and tightens the `opportunities` policies to check it; `events` and `interview_resources` are built with the correct policies from the start. Run `0003` even on a project you set up before it existed, and don't forget the one-time `insert into public.admins` step in setup step 2.5 above — without it, your own admin account will fail every write.

See [`NOTES.md`](NOTES.md) for what's intentionally deferred (email reminders, auto-discovery of new postings, in-app checkout for paid interview guides).
