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
Styling is intentionally neutral (no logo/brand colors were supplied yet). Swap in Hublr branding in `src/app/components/NavBar.tsx` and `globals.css` whenever assets are ready.

## In-app checkout for paid interview guides
`/interview-prep` lists paid resources with a `price_label` (e.g. "£9") and just links out to wherever the founder actually sells them — there's no cart/checkout in the app. This is the same underlying need as the "digital products for sale" item below; whenever that gets built (Stripe + product/order tables), `interview_resources` should probably grow a `checkout_url` or link into the same product catalog instead of a plain external link.

## Digital products for sale (storefront)
Beyond interview guides, the founder wants a general shop/checkout section for other digital products. Needs a payment provider (Stripe is the natural default) and product/order tables. Not scoped or built yet.

## Booking is a Calendly embed, not a real scheduler
`/book` just iframes `NEXT_PUBLIC_CALENDLY_URL`. There's no in-app availability/calendar logic — if the founder ever wants to drop the Calendly dependency, that would be a much larger build (calendar, availability rules, confirmation emails).

## Email deadline reminders
`/dashboard` shows an in-app "upcoming deadlines" widget today. Actual emails aren't sent. To add them:

- Sign up for an email service (e.g. [Resend](https://resend.com), free tier) and add its API key as an env var.
- Add a Vercel Cron job (a route handler + a schedule in `vercel.json`) that runs daily, queries `applications` where `deadline` is within N days and `reminder_sent_at` is null, emails the user, and sets `reminder_sent_at` so they aren't emailed twice. The `reminder_sent_at` column already exists on `applications` for this.

## Auto-discovery of new opportunities
The `opportunities` table already has `source_url` and `discovered_via` (`manual` | `auto`) columns, plus `is_published`, so a future scraper could insert candidate rows with `discovered_via: 'auto'`, `is_published: false` for the admin to review on `/admin` before they go live. Not built — admin entry is manual only for now. The same pattern (`source_url`/`is_published`) exists on `events`, so it could extend there too.

## In-browser CV/cover letter editing
`/documents` only supports uploading and managing files (PDF/DOCX) — there's no rich-text editor for writing or tweaking content directly in the app.

## Branding
Styling is intentionally neutral (no logo/brand colors were supplied yet). Swap in Hublr branding in `src/app/components/NavBar.tsx` and `globals.css` whenever assets are ready.
