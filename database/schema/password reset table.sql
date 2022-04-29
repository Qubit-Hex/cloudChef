--- password reset table




create table password_reset (
    id serial primary key,
    user_id integer not null,
    email VARCHAR (255) not null,
    token varchar(255) not null,
    created_at timestamp default now()
);
