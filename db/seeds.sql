
INSERT INTO roles (role_id, role_name)
VALUES
  (1, "Sales Person"),
  (2, "Product Researcher"),
  (3, "Manager"),
  (4, "Marketer"),
  (5, "Shipper and Receiver"),
  (6, "CSR"),
  (7, "Accountant");

INSERT INTO departments (department_id, department_name)
VALUES
  (1, "Sales"),
  (2, "Research and Development"),
  (3, "Management"),
  (4, "Marketing"),
  (5, "Shipping and Receiving"),
  (6, "Customer Service"),
  (7, "Accounting");

INSERT INTO salary (salary_id, salary_amount)
VALUES
  (1, 47000),
  (2, 130000),
  (3, 150000),
  (4, 85000),
  (5, 42000),
  (6, 35000),
  (7, 120000);      

INSERT INTO managers (manager_id, first_name, last_name)
VALUES
  (1, "Keanu", "Reeves");

INSERT INTO employees (first_name, last_name, role_id, department_id, salary_id, manager_id)
VALUES
  ("Jerry", "Seinfeld", 1, 1, 1, 1),
  ("Larry", "David", 2, 2, 2, 1),
  ("Keanu", "Reeves", 3, 3, 3, 1),
  ("Amy", "Poehler", 4, 4, 4, 1),
  ("Ricky", "Gervais", 5, 5, 5, 1),
  ("Nick", "Tony", 6, 6, 6, 1),
  ("Katie", "Jones", 7, 7, 7, 1);