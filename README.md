# The Job Seeker Hub — Early Career Tracker

A multi-user early career opportunity tracker for the UK (mainly), EU, and US: summer internship, off-cycle, spring internship, co-op, and grad/full-time-analyst roles.

- `/` — landing page, links to the 2027 and 2026 trackers.
- `/opportunities/2027`, `/opportunities/2026` — public, filterable by region, category, industry, status, and search. Logged-in users can "Track" a listing into their own pipeline.
- `/signup`, `/login`, `/reset-password` — anyone can create an account.
- `/dashboard` — a logged-in user's personal application pipeline: upcoming-deadline widget, applications grouped by stage, manual add.
- `/documents` — upload and manage CVs/cover letters (private per user), attach a specific one to any tracked application.
- `/admin` — restricted to the single admin account (set via `ADMIN_EMAIL`). Quick-add form plus edit/delete/publish for the curated opportunity list.

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
3. Go to **Authentication → Users → Add user**, and create yourself as the one admin account (email + password, with **Auto Confirm User** turned on). This is the only account that can log into `/admin`. Everyone else signs up themselves through `/signup`.
4. Go to **Project Settings → API** (or **Data API**). You'll need:
   - **Project URL**
   - **anon public** key

### 3. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
cp .env.local.example .env.local
```

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from step 2 above.
- `ADMIN_EMAIL` — the email address of the admin account you created in step 2.3. Whoever logs in with this email sees the `/admin` link and can manage the curated list; everyone else only sees their own dashboard/documents.

### 4. Run locally

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### 5. Push to GitHub and deploy on Vercel

1. Create a new empty repo on GitHub, then push this project to it.
2. In Vercel, "Add New Project" → import that GitHub repo.
3. In the Vercel project's **Settings → Environment Variables**, add the same three variables from `.env.local`.
4. Deploy. Every future push to the main branch redeploys automatically.

## Data model

- [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) — the curated `opportunities` table (admin-managed, publicly readable when published).
- [`supabase/migrations/0002_users_and_tracking.sql`](supabase/migrations/0002_users_and_tracking.sql) — per-user `applications` and `documents` tables, plus the private `documents` storage bucket. Every row is scoped to `auth.uid()` via Row Level Security, so users can only ever see or change their own data.

See [`NOTES.md`](NOTES.md) for what's intentionally deferred (email reminders, auto-discovery of new postings).
