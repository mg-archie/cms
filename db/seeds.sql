INSERT INTO department (department_name)
VALUES
  ("Sales"),
  ("Research and Development"),
  ("Management"),
  ("Marketing"),
  ("Shipping and Receiving"),
  ("Customer Service"),
  ("Accounting");

INSERT INTO roles (title, salary, department_id)
VALUES
  ("Sales Person", 47000, 1),
  ("Product Researcher", 130000, 2),
  ("Manager", 150000, 3),
  ("Marketer", 85000, 4),
  ("Shipper and Receiver", 42000, 5),
  ("CSR", 35000, 6),
  ("Accountant", 120000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Jerry", "Seinfeld", 1, 3),
  ("Larry", "David", 2, 3),
  ("Keanu", "Reeves", 3, NULL),
  ("Amy", "Poehler", 4, 3),
  ("Ricky", "Gervais", 5, 3),
  ("Nick", "Tony", 6, 3),
  ("Katie", "Jones", 7, 3);