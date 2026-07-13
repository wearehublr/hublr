-- Add a generic "Internship" category, and a separate general "Insight
-- Programme" category distinct from the Year 12/13-specific one added in
-- 0018 (that one's category value is unchanged: 'insight_program').

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
    'other'
  ));
