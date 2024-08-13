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


INSERT INTO eugenia.invitations(id_user_inv, id_inv_status, creation_date_inv, entry_date_time_inv, expiration_date_inv)
	VALUES ('2', '1' , creationdate(), '2024-08-11 07:00:00','2024-08-12 00:00:00');


INSERT INTO eugenia.invstatus (status_inv)
VALUES ('Activa'), ('Inactiva');    

-- Select all user invitations


SELECT id_user, name_user, last_name_user, id_inv_status, status_inv, id_inv, expiration_date_inv, timestatus(expiration_date_inv) as time_status
FROM eugenia.users
left JOIN eugenia.invitations on (id_user = id_user_inv )
left join eugenia.invstatus on (id_inv_status = id_status)
Order by id_user

-- Select invitations user id

 SELECT id_user, name_user, last_name_user, id_inv, creation_date_inv, entry_date_time_inv, expiration_date_inv, eugenia.timestatus(expiration_date_inv) as time_status, status_inv
                                  FROM eugenia.users
                                  LEFT JOIN eugenia.invitations on (id_user = id_user_inv )
                                  LEFT JOIN eugenia.invstatus on (id_inv_status = id_status)
                                  WHERE id_user = 2
                                    AND (id_inv = null or null is Null)
                                  Order by id_inv Desc;

 SELECT id_user, name_user, last_name_user, id_inv, creation_date_inv, entry_date_time_inv, expiration_date_inv, eugenia.timestatus(expiration_date_inv) as time_status, status_inv
                                  FROM eugenia.users
                                  LEFT JOIN eugenia.invitations on (id_user = id_user_inv )
                                  LEFT JOIN eugenia.invstatus on (id_inv_status = id_status)
                                  WHERE id_user = 2
                                    AND (id_inv = 10 or 10 is Null)
                                 Order by id_inv Desc;

-- Select invitations id

SELECT id_user, name_user, last_name_user, expiration_date_inv, timestatus(expiration_date_inv) as time_status, status_inv
FROM eugenia.users
left JOIN eugenia.invitations on (id_user = id_user_inv )
left join eugenia.invstatus on (id_inv_status = id_status)
where id_inv = '3';


-- DROP FUNCTION eugenia.timestatus();

-- DROP FUNCTION eugenia.timestatus();

CREATE OR REPLACE FUNCTION eugenia.timestatus(expiration_date_inv timestamp)
	RETURNS varchar
	LANGUAGE plpgsql
AS $function$
    
    DECLARE 
 		 time_status varchar(30);
 
	BEGIN
		
      SET TIMEZONE='America/Mexico_City';
      SELECT case WHEN  NOW() <= '2024-08-04 20:17:00' then 'Vijente' else 'Expirado' end INTO time_status;
      RETURN time_status;

	END;
$function$
;
GRANT EXECUTE ON FUNCTION eugenia.timestatus(timestamp without time zone) TO PUBLIC;

-- DROP FUNCTION eugenia.creationdate();

CREATE OR REPLACE FUNCTION eugenia.creationdate()
	RETURNS timestamp
	LANGUAGE plpgsql
AS $function$

  DECLARE 
 	 creation_date varchar(30);
 
	BEGIN
     
      SET TIMEZONE='America/Mexico_City';
      SELECT NOW() INTO creation_date;
      RETURN creation_date;

	END;
$function$

GRANT EXECUTE ON FUNCTION eugenia.creationdate() TO PUBLIC;
