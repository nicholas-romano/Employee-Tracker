CREATE DATABASE employee_tracker_cms;

USE employee_tracker_cms;

CREATE TABLE employee(
	id int auto_increment not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int null,
    primary key (id)
);

CREATE TABLE department(
	id int auto_increment not null,
    name varchar(30) not null,
    primary key (id)
);

CREATE TABLE role(
	id int auto_increment not null,
    title varchar(30) not null,
    salary decimal(30) not null,
    department_id int not null,
    primary key (id)
);

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;