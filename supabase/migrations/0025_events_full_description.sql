-- Events need the same short/full description split opportunities already
-- have: a short blurb for the card grid, and a full text field shown only
-- on the event's own detail page.

alter table public.events
  add column if not exists full_description text;
