/**
   @file: recipeschema.sql

   @purpose: this file is the schema structure for all the recipe functionalitys in the database
*/



-- create a food management system for storing recpies, ingredients, and steps and cooking time for all recipes for a specific store

create table recipe (
    recipe_id int auto_increment primary key,
    store_id integer references store(storeID),
    recipe_name varchar(255) not null,
    recipe_description varchar(255) not null,
    recipe_image varchar(255) not null,
    recipe_ingredient_id integer not null,
    recipe_allergens_id integer not null,
    recipe_cooking_time integer not null,
    recipe_steps_id integer not null,
    recipe_store_id integer not null,
    recipe_create_at date not null,
    recipe_update_at date not null
);

-- create a table for storing all the ingredients for a specific recipe

create table recipe_ingredents (
    recipe_ingredients_id int primary key auto_increment,
    recipe_id int not null,
    recipe_ingredients json not null,
    recipe_ingredients_create_at date not null,
    recipe_ingredients_update_at date not null,
    -- create a index switch to see if the recipe is active or not
    active tinyint not null
);

-- now lets create table for allergens for a speific recipe

create table recipe_allergens (
    recipe_allergens_id int primary key,
    recipe_id int not null,
    recipe_allergens json not null,
    recipe_allergens_create_at date not null,
    recipe_allergens_update_at date not null
);


-- table for all the steps for a specific recipe

create table recipe_steps  (
    recipe_steps_id int primary key auto_increment,
    recipe_id int not null,
    recipe_steps json not null,
    recipe_steps_create_at date not null,
    recipe_steps_update_at date not null
);

-- create table for the recipe flavour profile

create table recipe_flavor_profile (
    recipe_flavor_profile_id int primary key auto_increment,
    recipe_id int not null,
    recipe_flavor_profile json not null,
    recipe_flavor_profile_create_at date not null,
    recipe_flavor_profile_update_at date not null
);

-- store the cooking time of each recipe

create table recipe_cooking_time (
    recipe_cooking_time_id int primary key auto_increment,
    recipe_id int not null,
    recipe_cooking_time json not null,
    recipe_cooking_time_create_at date not null,
    recipe_cooking_time_update_at date not null
);


--- create a table for a recipes nutritional facts COLUMN_FORMAT

create table recipe_nutritional_facts (
    recipe_nutritional_facts_id int primary key auto_increment,
    recipe_id int not null,
    recipe_nutritional_facts json not null,
    recipe_nutritional_facts_create_at date not null,
    recipe_nutritional_facts_update_at date not null
);

-- create a schema for menus of a store

create table store_menu (
    store_menu_id int primary key auto_increment,
    store_id int REFERENCES store(storeID),
    store_menu_name varchar(255) not null,
    store_menu_description varchar(255) not null,
    store_menu_image varchar(255) not null,
    store_menu_create_at date not null,
    store_menu_update_at date not null,
    store_menu_active tinyint not null
);


-- create a schema for menu items

create table store_menu_items (
    menu_item_id int primary key auto_increment,
    store_menu_id int not null,
    menu_item_name varchar(255) not null,
    menu_item_description varchar(255) not null,
    menu_item_image varchar(255) not null,
    menu_item_create_at date not null,
    menu_item_update_at date not null,
    menu_item_price integer not null,
    menu_item_category varchar(255) not null,
    menu_item_category_id integer not null,
    menu_item_active tinyint not null
);

-- create a schema for menu item categories

create table store_menu_item_catagory  (
    menu_item_category_id int primary key auto_increment,
    menu_item_category varchar(255) not null,
    menu_item_category_create_at date not null,
    menu_item_category_update_at date not null
);
