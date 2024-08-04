/*
-- Name data base

nextia-db

CREATE DATABASE "nextiaDB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Mexico.1252'
    LC_CTYPE = 'Spanish_Mexico.1252'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Schema for CRUD by eugenia LocalHost

CREATE SCHEMA eugenia
    AUTHORIZATION postgres;

GRANT ALL ON SCHEMA eugenia TO PUBLIC;

-- eugenia.users

CREATE TABLE IF NOT EXISTS eugenia.users
(
    id_user serial,
    name_user character varying(255),
    last_name_user character varying(255),
    email_user character varying(255),
    password_user character varying(255),
    apartment_num_user character varying(255),
    PRIMARY KEY (id_user)
);


INSERT INTO eugenia.users(name_user, last_name_user, email_user,  password_user, apartment_num_user)
                	VALUES ('Gabriel', 'Maya Sanchez','isc_gmayas@hotmail.com', 'pass12345', 'B-02-A');

               	
SELECT id_user, name_user, last_name_user, email_user, password_user, apartment_num_user
	FROM eugenia.users;


-- eugenia.userdata

CREATE TABLE IF NOT EXISTS eugenia.invitations
(
    id_inv serial,
    id_user_inv integer,
    creation_date_inv timestamp,
    entry_date_time_inv timestamp, 
    expiration_date_inv timestamp,
    PRIMARY KEY (id_inv, id_user_inv),
	FOREIGN KEY (id_user_inv)
      REFERENCES eugenia.users(id_user)
);

-- PostgreSQL uses the yyyy-mm-dd hh:mm:ss format date.

INSERT INTO eugenia.invitations(id_user_inv, creation_date_inv, entry_date_time_inv, expiration_date_inv)
	VALUES ('1', '2024-08-03 22:17:00', '2024-08-04 07:00:00','2024-08-05 00:00:00');

-- Select all user invitations

SELECT id_user, name_user, last_name_user, id_inv, creation_date_inv, entry_date_time_inv, expiration_date_inv
FROM eugenia.users
left JOIN  eugenia.invitations on (id_user = id_user_inv )
Order by id_user

-- Select invitations user id

SELECT id_user, name_user, last_name_user, id_inv, creation_date_inv, entry_date_time_inv, expiration_date_inv
FROM eugenia.users
left JOIN eugenia.invitations on (id_user = id_user_inv )
WHERE id_user = '1'  

