DROP DATABASE IF EXISTS employee_database;

CREATE DATABASE employee_database;

USE employee_database;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(12,3) NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL
);

INSERT INTO department(name) VALUES ("Human Resources"), ("Finance"), ("Information Technology"), ("Sales");

INSERT INTO roles (title, salary, department_id) VALUES ("HR Specialist", 25000, 1), ("Accountant", 30000, 2), ("Software Engineer", 50000, 3), ("Software Engineer Manager", 20000, 4), ("HR Manager", 25000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Akhila", "Srinagula", 3, 3),("Santosh", "Shabadu", 3, 3),("Mayukha", "Shabadu", 4 ,null),("John", "Doe", 1, 6),("Jane", "Doe", 1, 6),("Dwayne", "Johnson", 5, null);

SELECT * FROM employee_database.employee;