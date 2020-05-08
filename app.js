const inquirer = require("inquirer");
const cTable = require('console.table');
const Database = require("./lib/Database");
const Queries = require("./lib/Queries");

const database = new Database({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "NiceCode78",
    database: "employee_tracker_cms"
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
                  viewAllEmployeesByDept();
                break;
                case 'View All Employees By Manager':
                  viewAllEmployeesByMgr();
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

        database.query(viewAllEmployees).then(rows => {

            let dataTable = [];
    
            for (let i = 0; i < rows.length; i++) {
                const { id, first_name, last_name, title, department, salary, manager } = rows[i];
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
    
        }, err => {
            return database.close().then(() => { throw err; })
        }).then(() => {
            askQuestions();
        }).catch(err => {
            console.log(err);
        });

}

const viewAllEmployeesByDept = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'dept',
                message: 'Which department would you like to view?',
                choices: [
                'Sales',
                'Engineering',
                'Finance',
                'Legal',
                'Cancel'
                ]
            }
        ])
        .then(answer => {
            const { dept } = answer;
            if (dept !== 'Cancel') {
                viewDept(dept);
            }
            else {
                endExecution();
            }
        });
}

const viewDept = (dept) => {

    const query = new Queries();
    const viewAllEmployeesByDept = query.viewAllEmployeesByDept();

    database.query(viewAllEmployeesByDept, dept).then(rows => {
  
      let dataTable = [];
  
      for (let i = 0; i < rows.length; i++) {
        const { id, first_name, last_name, title, department, salary, manager } = rows[i];
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

    }, err => {
        return database.close().then(() => { throw err; })
    }).then(() => {
        askQuestions();
    }).catch(err => {
        console.log(err);
    });

}

const viewAllEmployeesByMgr = () => {

    const query = new Queries();
    const viewAllManagers = query.viewAllManagers();

    let managersList = [];
  
    database.query(viewAllManagers).then(rows => {

    for (let i = 0; i < rows.length; i++) {
        managersList.push(rows[i].manager);
    }

    managersList.push('Cancel');

    return managersList;

    }).then(managersList => {
        console.log(`managersList ${managersList}`)
        
         inquirer
              .prompt([
                  {
                    type: 'list',
                    name: 'mgr',
                    message: 'What manager\'s employees do you want to view?',
                    choices: managersList
                }
              ])
              .then(answer => {
                  const { mgr } = answer;
                  if (mgr !== 'Cancel') {
                    viewMgr(mgr);
                  }
                  else {
                    endExecution();
                  }
              });

    });

}

const viewMgr = mgr => {
    //console.log(`manager selected: ${mgr}`)

    const index = mgr.indexOf(" ");

    const first_name = mgr.substring(0, index);
    const last_name = mgr.substr(index + 1);

    const query = new Queries();
    const viewAllEmployeesByManager = query.viewAllEmployeesByManager();
  
    database.query(viewAllEmployeesByManager, [first_name, last_name]).then(rows => {
        
        let dataTable = [];
    
        for (let i = 0; i < rows.length; i++) {
            const { id, first_name, last_name, title, department, salary, manager } = rows[i];
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

    }, err => {
        return database.close().then(() => { throw err; })
    }).then(() => {
        askQuestions();
    }).catch(err => {
        console.log(err);
    });

}

const endExecution = () => {
    database.close();
}

askQuestions();