-- make the database schema for store menus
-- and store menu items


use 'cloudchef';

CREATE TABLE store_menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    store_id INTEGER REFERENCES store(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    active boolean NOT NULL DEFAULT true
);


create table store_menu_item (
    id SERIAL PRIMARY KEY,
    store_menu_id INTEGER REFERENCES store_menu(id),
    name VARCHAR(255) NOT NULL,
    catagory VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    active boolean NOT NULL DEFAULT true
);
