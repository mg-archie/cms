SELECT *
FROM departments

SELECT *
FROM roles

SELECT *
FROM employees

SELECT roles.id, roles.title, department.department_name AS department, roles.salary FROM roles JOIN department ON roles.department_id = department.id;

SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.department_name AS department, roles.salary FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id;