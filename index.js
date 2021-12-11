var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "employee_database",
});

connection.connect(function (err) {
  if (err) throw err;
  userInput();
});

function userInput() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Departments":
          viewAllDpeartments();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "View All Employees":
          viewAllEmployees();
          break;

        case "Add a Department":
          addDepartment();
          break;

        case "Add a Role":
          addRole();
          break;

        case "Add an Employee":
          addEmployee();
          break;

        case "Update an Employee Role":
          updateEmployeeRole();
          break;
      }
    });
}

function viewAllDpeartments() {
  connection.query("SELECT * FROM department", function (err, res) {
    console.table(res);
            userInput(); 
  });
}

function viewAllRoles() {
  connection.query("SELECT * FROM roles", function (err, res) {
    console.table(res); 
        userInput(); 
  });
}

function viewAllEmployees() {
    connection.query("SELECT e.id, e.first_name, e.last_name, r.department_id, r.title, r.salary, b.first_name AS manager  FROM (employee e INNER JOIN roles r on e.role_id = r.id) LEFT JOIN employee b on e.manager_id = b.id", function(err, res) {
        console.table(res);  
        userInput();
  });
}

function addDepartment() {
  // to be completed
  connection.query("SELECT * FROM employee", function (err, res) {
    console.table(res);
  });
}

function addRole() {
  // to be completed
  connection.query("SELECT * FROM employee", function (err, res) {
    console.table(res);
  });
}

function addEmployee() {
  // to be completed
  connection.query("SELECT * FROM employee", function (err, res) {
    console.table(res);
  });
}

function updateEmployeeRole() {
  // to be completed
  connection.query("SELECT * FROM employee", function (err, res) {
    console.table(res);
  });
}
