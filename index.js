const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const Queries = require("./lib/Queries");

const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "NiceCode78",
  database: "employee_tracker_cms"
});

connection.connect(err => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    askQuestions();
});
  
const askQuestions = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                  'View All Employees',
                  'View All Employees By Department',
                  'View All Employees By Manager',
                  'Add Employee',
                  'Remove Employee',
                  'Update Employee Role',
                  'Update Employee Manager',
                  'Exit'
                ]
            }
        ])
        .then(answer => {
            const { action } = answer;
            switch(action) {
                case 'View All Employees':
                  viewAllEmployees();
                break;
                case 'View All Employees By Department':

                break;
                case 'View All Employees By Manager':

                break;
                case 'Add Employee':

                break;
                case 'Remove Employee':

                break;
                case 'Update Employee Role':

                break;
                case 'Update Employee Manager':

                break;
                case 'Exit':
                  endExecution();
                break;
            }
      });
}

const viewAllEmployees = () => {
  const query = new Queries();
  const viewAllEmployees = query.viewAllEmployees();

  connection.query(viewAllEmployees, (err, res) => {

    if (err) throw err;

    let dataTable = [];

    for (let i = 0; i < res.length; i++) {
      const { id, first_name, last_name, title, department, salary, manager } = res[i];
      const obj = {};
      obj["id"] = id;
      obj["first_name"] = first_name;
      obj["last_name"] = last_name;
      obj["title"] = title;
      obj["department"] = department;
      obj["salary"] = salary;
      obj["manager"] = manager;

      dataTable.push(obj);
    }

  const table = cTable.getTable(dataTable);
    
  console.log(table);

  });

}

const endExecution = () => {
  connection.end();
}