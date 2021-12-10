var inquirer = require('inquirer')
var mysql = require('msql')

var connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "employee_database"
});

connection.connect(function(err) {
    if(err) throw err;
    userInput();
});

function userInput() {
    inquirer.prompt({
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
            "Update an Employee Role"
        ]
    }).then(function(answer) {
        switch(answer.action) {
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
    })
}