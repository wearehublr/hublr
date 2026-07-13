-- Add law-specific categories (Vacation Scheme, Training Contract) and a
-- pre-university outreach category (Insight Programme for Year 12/13).

alter table public.opportunities drop constraint if exists opportunities_category_check;
alter table public.opportunities add constraint opportunities_category_check
  check (category in (
    'summer_internship',
    'off_cycle',
    'spring_internship',
    'co_op',
    'placement_year',
    'vacation_scheme',
    'insight_program',
    'grad_scheme',
    'training_contract',
    'full_time_analyst',
    'other'
  ));
