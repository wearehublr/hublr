-- Lets the founder tag existing interview-prep resources by what they're
-- for, so /interview-prep can filter by "what are you preparing for"
-- instead of showing one flat, ungrouped list. Nullable, no default:
-- existing untagged rows fall under "General" in the UI until tagged.

alter table public.interview_resources
  add column if not exists topic text check (
    topic in ('hirevue', 'assessment_centre', 'case_study', 'competency', 'technical', 'general')
  );
