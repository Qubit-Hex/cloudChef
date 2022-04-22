-- schema for the employee shifts
--  attr


-- schedule_id, employee_id, id, start_time, end_time, day_of_week
--- dropped, created_at, updated_at.

update table employee_shifts (
  id serial primary key,
  schedule_id integer,
  employee_id integer,
  start_time time,
  end_time time,
  day_of_week integer,
  dropped boolean default false,
  off boolean default false,
  created_at timestamp,
  updated_at timestamp
);
