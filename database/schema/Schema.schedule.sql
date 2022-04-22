-- need to create a schedule table with the following
-- fields:
---- id, year, month, week, storeID

create table schedule (
  id serial primary key,
  year integer,
  month integer,
  week integer,
  storeID integer
);
