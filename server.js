const inquirer = require('inquirer');
const table = require('console.table')
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '$Datasave1',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

function qPrompt() {
  inquirer.prompt(questions = [
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
      name: 'init'
    }]).then(answers => {
      if (answers.init === 'View All Departments') {
        return viewDep();
      } else if (answers.init === 'View All Roles') {
        return viewRol();
      } else if (answers.init === 'View All Employees') {
        return viewEmp();
      } else if (answers.init === 'Add A Department') {
        return addDep();
      } else if (answers.init === 'Add A Role') {
        return addRol();
      } else if (answers.init === 'Add An Employee') {
        return addEmp();
      } else if (answers.init === 'Update An Employee Role') {
        return updateRol();
      }
    });
}

function viewDep() {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) {
      console.error(err);
      return
    }
    console.table(results);
    qPrompt();
  })
}

function viewRol() {
  db.query('SELECT roles.id, roles.title, department.department_name AS department, roles.salary FROM roles JOIN department ON roles.department_id = department.id;', function (err, results) {
    if (err) {
      console.error(err);
      return;
    }
    console.table(results);
    qPrompt();
  });
}

function viewEmp() {
  db.query('SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.department_name AS department, roles.salary FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id;', function (err, results) {
    if (err) {
      console.error(err);
      return
    }
    console.table(results);
    qPrompt();
  })
}

function addDep() {
  inquirer.prompt(questions = [
    {
      type: 'input',
      message: 'Enter a department name',
      name: 'addDep'
    }]).then(answers => {
      const params = [answers.addDep]
      db.query('INSERT INTO department (department_name) VALUES (?)', params, (err, results) => {
        if (err) {
          console.error(err);
          return
        }
        console.log(`Department ${params} added!`);
        qPrompt();
      })
    });
}

function addRol() {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const depChoices = results.map(dep => dep.department_name);
    inquirer.prompt(questions = [
      {
        type: 'input',
        message: 'Enter a new role',
        name: 'addRol'
      },
      {
        type: 'input',
        message: 'What is the roles salary?',
        name: 'addSal'
      },
      {
        type: 'list',
        message: 'Which department is the role in?',
        choices: depChoices,
        name: 'whichDep'
      }]).then(answers => {
        const { addRol, addSal, whichDep } = answers;

        const depChosen = results.find(dep => dep.department_name === whichDep);
        if (!depChosen) {
          console.error('Department not found')
          return;
        }
        const inDep = depChosen.id;
        const newRol = [addRol, addSal, inDep];
        db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', newRol, (rolErr, roleResults) => {
          if (rolErr) {
            console.error(rolErr);
            return
          }
          console.log(`Role ${addRol} added with salary of ${addSal} in ${inDep} department!`);
          qPrompt();
        })
      })
  })
}

function addEmp() {
  db.query('SELECT * FROM roles', (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const rolChoices = results.map(role => ({
      name: role.title,
      value: role.id,
    }));
    inquirer.prompt(questions = [
      {
        type: 'input',
        message: 'What is the employees first name?',
        name: 'firstName'
      },
      {
        type: 'input',
        message: 'What is the employees last name?',
        name: 'lastName'
      },
      {
        type: 'list',
        message: 'What is the employees role?',
        choices: rolChoices,
        name: 'whichRol'
      }]).then(answers => {
        const { firstName, lastName, whichRol } = answers;

        db.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [firstName, lastName, whichRol], (empErr, empResults) => {
          if (empErr) {
            console.error(empErr);
            return
          }
          console.log(`Employee ${firstName} ${lastName} added with role of ${whichRol}`);
          qPrompt();
        })
      })
  })
}

function updateRol() {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const empChoices = results.map(employee => ({
      name: employee.first_name,
      value: employee.id
    }));
    db.query('SELECT * FROM roles', (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      const rolChoices = results.map(role => ({
        name: role.title,
        value: role.id,
      }));
      inquirer.prompt(questions = [
        {
          type: 'list',
          message: 'What is the employees role?',
          choices: empChoices,
          name: 'whichEmp'
        },
        {
          type: 'list',
          message: 'What is the employees role?',
          choices: rolChoices,
          name: 'whichRol'
        }]).then(answers => {
          const { whichEmp, whichRol } = answers;

          db.query('UPDATE employee SET role_id = ? WHERE id = ?', [whichRol, whichEmp], (updateErr, updateResults) => {
            if (updateErr) {
              console.error(updateErr);
              return;
            }
            console.log(`Employee ${whichEmp} updated to role of ${whichRol}`);
            qPrompt();
          })
        })
    })
  })  
}

qPrompt();