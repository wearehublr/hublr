-- "Full-Time / Analyst" and "Grad Scheme" were two separate categories for
-- what users experience as the same thing. Merge them: 'grad_scheme' is now
-- the single category value for both (relabelled "Full-Time Analyst / Grad
-- Scheme" in the app), and 'full_time_analyst' is retired.

-- 1. Re-tag existing opportunities.
update public.opportunities
set category = 'grad_scheme'
where category = 'full_time_analyst';

-- 2. Re-tag any saved user preferences (onboarding "type of role" picks),
-- de-duplicating in case someone had already picked both.
update public.profiles
set preferred_categories = (
  select array_agg(distinct cat)
  from unnest(array_replace(preferred_categories, 'full_time_analyst', 'grad_scheme')) as cat
)
where 'full_time_analyst' = any(preferred_categories);

-- 3. Re-tag any saved search / job alert filters using the old value.
update public.saved_searches
set category = 'grad_scheme'
where category = 'full_time_analyst';

-- 4. Drop 'full_time_analyst' from the allowed category values.
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
    'apprenticeship',
    'degree_apprenticeship',
    'entry_level',
    'other'
  ));
