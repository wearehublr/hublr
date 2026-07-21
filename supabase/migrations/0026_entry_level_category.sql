-- Add "Entry Level" category, for early-career roles that are hired as
-- general full-time associates (junior experience required, e.g. 6+
-- months) rather than through a structured grad scheme or named programme.

alter table public.opportunities drop constraint if exists opportunities_category_check;
alter table public.opportunities add constraint opportunities_category_check
  check (category in (
    'internship',
    'summer_internship',
    'off_cycle',
    'spring_internship',
    'co_op',
    'placement_year',
    'vacation_scheme',
    'insight_program',
    'insight_program_general',
    'grad_scheme',
    'training_contract',
    'full_time_analyst',
    'apprenticeship',
    'degree_apprenticeship',
    'entry_level',
    'other'
  ));
