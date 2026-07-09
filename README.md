# 2027 Early Career Tracker

A public, filterable tracker of 2027 summer internship, off-cycle, spring internship, co-op, and grad/full-time-analyst opportunities across the UK, EU, and US — with a private admin view for quick manual entry.

- `/` — public page, no login required. Filter by region, category, industry, status, and search.
- `/admin` — protected. Quick-add form plus edit/delete/publish for every listing.

## Stack

Next.js (App Router) + Tailwind CSS, backed by Supabase (Postgres + Auth), deployed on Vercel.

## One-time setup

### 1. Create accounts (all free tier)

1. **GitHub** — [github.com/signup](https://github.com/signup). This holds the code and is what Vercel deploys from.
2. **Supabase** — [supabase.com](https://supabase.com), sign up, then "New project". Note the database password you set.
3. **Vercel** — [vercel.com/signup](https://vercel.com/signup), sign up with your GitHub account so it can access your repos.

### 2. Set up the Supabase project

1. In the Supabase dashboard, open **SQL Editor** → **New query**, paste the contents of [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql), and run it. This creates the `opportunities` table and its access rules.
2. Go to **Authentication → Users → Add user**, and create yourself as the one admin account (email + password). This is the only account that can log into `/admin`.
3. Go to **Project Settings → API**. You'll need:
   - **Project URL**
   - **anon public** key

### 3. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in the two values from the step above:

```bash
cp .env.local.example .env.local
```

### 4. Run locally

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public page, and [http://localhost:3000/admin](http://localhost:3000/admin) to log in and add opportunities.

### 5. Push to GitHub and deploy on Vercel

1. Create a new empty repo on GitHub, then push this project to it.
2. In Vercel, "Add New Project" → import that GitHub repo.
3. In the Vercel project's **Settings → Environment Variables**, add the same two variables from `.env.local`.
4. Deploy. Every future push to the main branch redeploys automatically.

## Data model

See [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) for the full `opportunities` schema, and [`NOTES.md`](NOTES.md) for the plan to eventually automate discovery of new postings.
