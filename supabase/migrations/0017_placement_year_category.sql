-- Add "Placement Year" as a category option.

alter table public.opportunities drop constraint if exists opportunities_category_check;
alter table public.opportunities add constraint opportunities_category_check
  check (category in (
    'summer_internship',
    'off_cycle',
    'spring_internship',
    'co_op',
    'placement_year',
    'grad_scheme',
    'full_time_analyst',
    'other'
  ));
