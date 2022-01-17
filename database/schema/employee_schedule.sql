/*
*
  *  @file: employee_schedule.sql
  *
  *  @purpose: inorder to generate the tables needed for the employee scheduling system
  *             and create dummy values for the tables inorder to test the api
  *
  */


/*
 * @table: employee_schedule
 *
 * @purpose: to store the store entry so week can create weekly schedules
 *
*/



use cloudchef;

-- check if the table exists


create table if not exists store_schedule (
    id int not null AUTO_INCREMENT,
    storeID int not null,
    year int,
    week int,
    primary key (id)
);

-- dummy inserts

insert into store_schedule (storeID, year, week) values (1, 2018, 1);

/*
    * @table: employee_schedule
    *
    * @purpose: to store the employee entry so week can create weekly schedules
    *
*/



create table if not exists employee_shift (
    id INT NOT NULL AUTO_INCREMENT,
    employeeID integer,
    -- this will reference the store_schedule table inorder to group
    store_schedule integer,
    day integer,
    start_time INT,
    end_time INT,
    is_open boolean, -- does the employee have open availability
    is_off_day boolean, -- is the day off
    primary key (id)
);

-- insert a employees weekly shifts

insert into employee_shift (employeeID, store_schedule, day, start_time, end_time, is_open, is_off_day) values (1, 1, 1, 8, 17, true, false);
insert into employee_shift (employeeID, store_schedule, day, start_time, end_time, is_open, is_off_day) values (1, 1, 2, 8, 17, true, false);
insert into employee_shift (employeeID, store_schedule, day, start_time, end_time, is_open, is_off_day) values (1, 1, 3, 8, 17, true, false);
insert into employee_shift (employeeID, store_schedule, day, start_time, end_time, is_open, is_off_day) values (1, 1, 4, 8, 17, true, false);
insert into employee_shift (employeeID, store_schedule, day, start_time, end_time, is_open, is_off_day) values (1, 1, 5, 8, 17, true, false);
insert into employee_shift (employeeID, store_schedule, day, start_time, end_time, is_open, is_off_day) values (1, 1, 6, 8, 17, true, true);
insert into employee_shift (employeeID, store_schedule, day, start_time, end_time, is_open, is_off_day) values (1, 1, 7, 8, 17, true, true);

-- end of week insert

/*
 * @ table: employee_schedule_availability
 *
 * @ purpose: to store the availability of the employee within the store
 *
*/



create table if not exists  employee_schedule_availability (
    id INT NOT NULL AUTO_INCREMENT,
    employee_id integer,
    day integer,
    -- this will be range what time of the day is available to work
    start_time integer,
    end_time integer,
    primary key (id)
);

-- make insert to show the employee availability

insert into employee_schedule_availability (employee_id, day, start_time, end_time) values (1, 1, 0, 24);
insert into employee_schedule_availability (employee_id, day, start_time, end_time) values (1, 2, 0, 24);
insert into employee_schedule_availability (employee_id, day, start_time, end_time) values (1, 3, 0, 24);
insert into employee_schedule_availability (employee_id, day, start_time, end_time) values (1, 4, 0, 24);
insert into employee_schedule_availability (employee_id, day, start_time, end_time) values (1, 5, 0, 24);
insert into employee_schedule_availability (employee_id, day, start_time, end_time) values (1, 6, 0, 24);
insert into employee_schedule_availability (employee_id, day, start_time, end_time) values (1, 7, 0, 24);

-- end of availability insert


/*
 * @table: employee_shift_drop
    *
    * @purpose: for employees to drop a shift they are unable to work
    *
*/



create table if not exists employee_drop_shifts (
    id INT NOT NULL AUTO_INCREMENT,
    employee_id integer,
    employee_shift_id integer,
    reason text,
    date_dropped integer,
    aprroved boolean,
    primary key (id)
);


-- insert a dummy employee drop shift

insert into employee_drop_shifts (employee_id, employee_shift_id, reason, date_dropped, aprroved) values (1, 1, 'I am sick', 20180101, true);


-- end of drop shift insert

/*
 *  @table: employee_pickup_shift
 *
 *  @purpose: for employees to pickup a shift from another employee.
*/




create table if not exists employee_pickup_shift (
    id INT NOT NULL AUTO_INCREMENT,
    employee_id integer,
    employee_shift_id integer,
    date_picked_up integer,
    aprroved boolean,
    primary key (id)
);


insert into employee_pickup_shift (employee_id, employee_shift_id, date_picked_up, aprroved) values (2, 1, 20180101, true);

/*
 * @ table: employee_schedule_availability
 * @ purpose: to store the availability of the employee within the store
 *
*/


create table if not exists employee_schedule_punch_in (
    id integer NOT NULL AUTO_INCREMENT,
    -- refernce to employee_shift
    employee_schedule_id integer,
    time integer,
    primary key (id)
);


insert into employee_schedule_punch_in (employee_schedule_id, time) values (1, 8);

/*
 * @table: employee_schedule_punchout
 *
 * @purpose: to record the punch out times of the employees

*/


create table if not exists employee_schedule_punch_out (
    id integer NOT NULL AUTO_INCREMENT,
    -- refernce to employee_shift
    employee_schedule_id integer,
    time integer,
    primary key (id)
);

insert into employee_schedule_punch_out (employee_schedule_id, time) values (1, 17);

-- next we will create a table inorder to add the employee salary and department information


/*
 * @table: employee
 *
 * @purpose: inorder to store the employee information
 *
*/



create table  if not exists employee (
    id INT NOT NULL AUTO_INCREMENT,
    userID int,
    storeID int,
    department_id integer,
    first_name text,
    last_name text,
    gender varchar,
    salary integer,
    is_active boolean, -- weather the employee is still active is the organization
    start_date date, -- the date the employee started working
    end_date date NULL, -- the date the employee left the organization
    primary key (id)

);


-- insert a dummy employee

insert into employee (userID, storeID, department_id, first_name, last_name, salary, is_active, start_date, end_date) values (1, 1, 1, 'John', 'Doe', 40000, true, 20180101, NULL);
insert into employee (userID, storeID, department_id, first_name, last_name, salary, is_active, start_date, end_date) values (2, 1, 1, 'Jane', 'Doe', 50000, true, 20180101, NULL);


/*
 * @table: department
 *
 * @purpose: inorder to store the department information
 *
*/



create table if not exists department (
    id int NOT NULL AUTO_INCREMENT,
    storeID int,
    name text,
    primary key (id)
);


-- insert a dummy departments for a restaurant

insert into department (storeID, name) values (1, 'Kitchen');
insert into department (storeID, name) values (1, 'Bar');
insert into department (storeID, name) values (1, 'Front Office');
insert into department (storeID, name) values (1, 'Back Office');
insert into department (storeID, name) values (1, 'Bartender');
insert into department (storeID, name) values (1, 'Manager');
insert into department (storeID, name) values (1, 'Cashier');
insert into department (storeID, name) values (1, 'Waiter');
insert into department (storeID, name) values (1, 'Chef');
insert into department (storeID, name) values (1, 'Busser');
insert into department (storeID, name) values (1, 'Host');
insert into department (storeID, name) values (1, 'Server');
insert into department (storeID, name) values (1, 'Dishwasher');
