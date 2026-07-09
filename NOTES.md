# Future: automated discovery (not built yet)

The schema already has what a later automation pass would need:

- `source_url` — where a listing was found.
- `discovered_via` (`manual` | `auto`) — lets scraped rows be told apart from ones you typed in.
- `is_published` — a scraper can insert rows with this set to `false` so they queue for review on `/admin` instead of going live immediately.

A reasonable phase 2: a Vercel Cron job (or a scheduled script) that checks a curated list of sources (company career pages, board RSS feeds, aggregator APIs) on a schedule, and inserts new candidate rows as `discovered_via: 'auto'`, `is_published: false`. You'd then review and publish them from `/admin` same as anything else. Not implemented in this pass — the admin flow is manual entry only for now.
