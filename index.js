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
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the name of the new Department: ",
            name: "Department"
        }
    ]).then(function (answers) {
        connection.query("INSERT INTO department SET?", {
            name: answers.Department   
        });
        userInput();
    })
}

function addRole() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) {
            throw (err);
        }
        var departments = [];
        for (var i = 0; i < res.length; i++) {
            departments.push(res[i].name);
        }

        inquirer.prompt([
            {
                type: "input",
                message: "Enter the new Role's title: ",
                name: "title"
            }, 
            {
                type: "input",
                message: "Enter the new Role's Salary: ",
                name: "salary"
            }, 
            {
                type: "list",
                message: "Enter the new Role's Department Id: ",
                choices: departments,
                name: "departmentId"
            }, 
        ]).then(function (answers) {
            connection.query("SELECT id FROM department where ?", {name: answers.departmentId}, function(err, res) {
                 if (err) {
                     throw (err)
                 }

                 var id = res[0].id;
                 connection.query("INSERT INTO roles SET?", {
                    title: answers.title,
                    salary: answers.salary,
                    department_id: id
                });
                userInput();
            });    
        });
  });
}

function addEmployee() {
    connection.query("SELECT title FROM roles", function(err, res) {
        if (err) {
            throw (err);
        }
        var roles = [];
        for (var i = 0; i < res.length; i++) {
            roles.push(res[i].title);
        } 

        connection.query("SELECT first_name FROM employee WHERE manager_id IS NULL;", function(err, res) {
            if (err) {
                throw (err);
            }

            var managers = [];
            for (var i = 0; i < res.length; i++) {
                managers.push(res[i].first_name);
            }

            inquirer.prompt([
               {
                   type: "input",
                   message: "Enter the new Employee's First Name: ",
                   name: "firstName"
               }, 
               {
                   type: "input",
                   message: "Enter the new Employee's Last Name: ",
                   name: "lastName"
               }, 
               {
                   type: "list",
                   message: "Enter the new Employee's Role Id: ",
                   choices: roles,
                   name: "roleId"
               }, 
               {
                   type: "list",
                   message: "Select the Employee's Manager: ",
                   choices: managers,
                   name: "managerId"
               }
           ]).then(function (answers) {
               connection.query("SELECT id from roles WHERE ?", {title: answers.roleId}, function(err, response) {
                     if (err) {
                         throw (err);
                     }

                     connection.query("SELECT id from employee WHERE?", {first_name: answers.managerId}, function(err, res) {
                         if (err) {
                             throw (err);
                         }
                         connection.query("INSERT INTO employee SET?", {
                           first_name: answers.firstName,
                           last_name: answers.lastName,
                           role_id: response[0].id,
                           manager_id: res[0].id
                         }) 
                         userInput();
                     });
               });
           });
       });
    });
}

function updateEmployeeRole() {
  // to be completed
  connection.query("SELECT * FROM employee", function (err, res) {
    console.table(res);
  });
}
