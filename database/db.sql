CREATE DATABASE database_links;

USE database_links;


CREATE TABLE users(

	id INT(11) NOT NULL,

	username VARCHAR(16) NOT NULL,

	password VARCHAR(60) NOT NULL,

	fullname VARCHAR(100) NOT NULL

);

ALTER TABLE users
 ADD PRIMARY KEY (id);	

ALTER TABLE users
 MODIFY id INT(11) NOT NULL AUTO_INCREMENT;



CREATE TABLE links(
id  INT(11) NOT NULL,
title VARCHAR(150) NOT NULL,
url VARCHAR(150) NOT NULL,
description TEXT NOT NULL,
user_id  INT(11) NOT NULL,
created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)  
    
);