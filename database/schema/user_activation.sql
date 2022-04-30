--- make a database table for activating user accounts
-- table for activating the user accounts

create table if not exists account_activation(
    id int not null auto_increment,
    user_id int not null,
    activation_code varchar(255) not null,
    primary key(id),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);
