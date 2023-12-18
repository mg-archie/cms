DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE roles (
  role_id INT PRIMARY KEY,
  role_name VARCHAR(30) NOT NULL
);

CREATE TABLE departments (
  department_id INT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE salary (
  salary_id INT PRIMARY KEY,
  salary_amount INT
);

CREATE TABLE managers (
  manager_id INT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30)
);

CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  department_id INT,
  salary_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE SET NULL,
  FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE SET NULL,
  FOREIGN KEY (salary_id) REFERENCES salary(salary_id) ON DELETE SET NULL,
  FOREIGN KEY (manager_id) REFERENCES managers(manager_id) ON DELETE SET NULL
);
