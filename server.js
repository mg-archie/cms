const inquirer = require('inquirer');
const table = require('console.table')
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
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
  // add input from inquirer
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
  // should show id, title, department, salary
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
      });
  })
}

function addEmp() {

}

function updateRol() {

}

qPrompt();