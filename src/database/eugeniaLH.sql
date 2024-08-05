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


-- eugenia.invitations

CREATE TABLE IF NOT EXISTS eugenia.invitations (
	id_inv serial4 NOT NULL,
	id_user_inv int4 NOT NULL,
	id_inv_status int4 NULL,
	creation_date_inv timestamp NULL,
	entry_date_time_inv timestamp NULL,
	expiration_date_inv timestamp NULL,
	CONSTRAINT invitations_pkey PRIMARY KEY (id_inv, id_user_inv),
	CONSTRAINT invitations_id_inv_status_fkey FOREIGN KEY (id_inv_status) REFERENCES eugenia.invstatus(id_status),
	CONSTRAINT invitations_id_user_inv_fkey FOREIGN KEY (id_user_inv) REFERENCES eugenia.users(id_user)
);
CREATE INDEX invitations_id_inv_status_idx ON eugenia.invitations (id_inv_status);
-- PostgreSQL uses the yyyy-mm-dd hh:mm:ss format date.

-- eugenia.invstatus definition

CREATE TABLE IF NOT EXISTS eugenia.invstatus (
	id_status serial4 NOT NULL,
	status_inv varchar(255) NULL,
	CONSTRAINT invstatus_pkey PRIMARY KEY (id_status)
);
INSERT INTO eugenia.invitations(id_user_inv, creation_date_inv, entry_date_time_inv, expiration_date_inv)
	VALUES ('1', '2024-08-04 15:00:00', '2024-08-11 07:00:00','2024-08-12 00:00:00');

-- Select all user invitations

SELECT id_user, name_user, last_name_user, id_inv, creation_date_inv, entry_date_time_inv, expiration_date_inv, status_inv
FROM eugenia.users
left JOIN  eugenia.invitations on (id_user = id_user_inv )
Order by id_user

-- Select invitations user id

SELECT id_user, name_user, last_name_user, id_inv, creation_date_inv, entry_date_time_inv, expiration_date_inv, status_inv
FROM eugenia.users
left JOIN eugenia.invitations on (id_user = id_user_inv )
WHERE id_user = '1'  

