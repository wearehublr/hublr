-- Add a dedicated city field to opportunities (previously only region/country).

alter table public.opportunities
  add column if not exists city text;
