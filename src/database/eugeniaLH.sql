/*
-- Name data base

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
    email_user character varying(255),
    password_user character varying(255),
    PRIMARY KEY (id_user)
);


INSERT INTO eugenia.users(name_user, email_user, password_user)
	VALUES ('gmayas', 'isc_gmayas@hotmail.com', 'pass12345');

SELECT id_user, name_user, email_user, password_user
	FROM eugenia.users;


-- eugenia.userdata

CREATE TABLE IF NOT EXISTS eugenia.userdata
(
    id_userdata serial,
    id_user_userdata integer,
    address_userdata character varying(255),
    phone_userdata character varying(20),
    birthdate_userdata date,
    PRIMARY KEY (id_userdata, id_user_userdata),
	FOREIGN KEY (id_user_userdata)
      REFERENCES eugenia.users(id_user)
);

ALTER TABLE eugenia.userdata
    OWNER to aovudieocshokj;

-- PostgreSQL uses the yyyy-mm-dd format date.

INSERT INTO eugenia.userdata(id_user_userdata, address_userdata, phone_userdata, birthdate_userdata)
	VALUES ('1', 'Veronoca 302', '+52 782 823 2380','1975-02-08');

-- Select data user

select name_user, email_user, password_user, address_userdata, phone_userdata, birthdate_userdata
from eugenia.users as us
left join eugenia.userdata as ud on (id_user = id_user_userdata );

-- Select data user age

SELECT id_userdata, id_user_userdata, address_userdata, phone_userdata, 
       birthdate_userdata, Age(birthdate_userdata) age_userdata 
	FROM eugenia.userdata
	Where id_user_userdata = '1';

