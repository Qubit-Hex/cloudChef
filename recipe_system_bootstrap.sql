/**
    @file: recipe_system_bootstrap.sql

    @purpose: to bootstrap the recipe system in the database
*/


USE 'cloudchef';


-- create  a table to store  recipe_file_logs

CREATE TABLE logs_recipe_file_logs (
    id INT NOT NULL AUTO_INCREMENT,
    honeypot_hash VARCHAR(255) NOT NULL,
    file_hash VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    verified BOOLEAN NOT NULL,
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);


