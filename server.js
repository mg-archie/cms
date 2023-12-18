const inquirer = require('inquirer');
const table = require('console.table')
const fs = require('fs');
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
  db.query('SELECT * FROM departments', (err, results) => {
    if (err) {
      console.error(err);
      return
    }
    console.table(results);
    qPrompt();
  })
}

function viewRol() {
  db.query('SELECT * FROM roles', function (err, results) {
    if (err) {
      console.error(err);
      return
    }
    console.table(results);
    qPrompt();
  })
}

function viewEmp() {
  db.query('SELECT * FROM employees', function (err, results) {
    if (err) {
      console.error(err);
      return
    }
    console.table(results);
    qPrompt();
  })
}

function addDep() {

}

qPrompt();