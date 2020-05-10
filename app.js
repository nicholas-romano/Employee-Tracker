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
                  'Add Department',
                  'Add Role',
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
                case 'Add Department':
                  addDepartment();
                break;
                case 'Add Role':
                  addRole();
                break;
                case 'Add Employee':
                  addEmployee();
                break;
                case 'Remove Employee':
                  removeEmployee();
                break;
                case 'Update Employee Role':
                  updateEmployeeRole();
                break;
                case 'Update Employee Manager':
                  updateEmployeeManager();
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

            if (rows.length > 0) {

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

            }
            else {
                console.log("There are no employees in the database.");
                askQuestions();
            } 
    
        }, err => {
            return database.close().then(() => { throw err; })
        }).then(() => {
            askQuestions();
        }).catch(err => {
            console.log(err);
        });

}

const viewAllEmployeesByDept = () => {

    const query = new Queries();
    const viewAllDepartments = query.viewAllDepartments();

    let deptList = [];

    database.query(viewAllDepartments).then(rows => {

        if (rows.length > 0) {

            for (let i = 0; i < rows.length; i++) {
                deptList.push(rows[i].department);
            }
    
            deptList.push('Cancel');
    
            return deptList;

        }
        else {
            console.log("There are no departments in the database.");
            askQuestions();
        }

    }).then(deptList => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'dept',
                    message: 'Which department would you like to view?',
                    choices: deptList
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

        if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
                managersList.push(rows[i].manager);
            }
    
            managersList.push('Cancel');
    
            return managersList;
        }
        else {
            console.log('There are no managers in the database.');
            askQuestions();
        }

    }).then(managersList => {
        
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

const addDepartment = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter the name of the department you would like to add:',
        }
    ])
    .then(answers => {
        let department = answers.department;

        department = initialCaps(department);

        const query = new Queries();
        const insertOrIgnoreDepartment = query.insertOrIgnoreDepartment();

        database.query(insertOrIgnoreDepartment, department).then(rows => {

            if (rows.insertId !== 0) {
                console.log("New Department added");
            }
            else {
                console.log("this department already exists. Please enter a different name.");
                addDepartment();
            }

        }).then(() => {
            askQuestions();
        });

    });
}

const addRole = () => {

    const query = new Queries();
    const viewAllDepartments = query.viewAllDepartments();

    let deptList = [];
    let dept_id;

    database.query(viewAllDepartments).then(rows => {

        if (rows.length > 0) {

            for (let i = 0; i < rows.length; i++) {
                deptList.push(rows[i].department);
            }
    
            return deptList;

        }
        else {
            console.log('You must first add a department before you can add a role to the database.');
            askQuestions();
        }

    }).then(deptList => {

        inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the name of the role you would like to add:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is this salary for this role?',
            },
            {
                type: 'list',
                name: 'dept',
                message: 'Select a department where this role belongs to:',
                choices: deptList
            }
        ])
        .then(answers => {

                let { title, salary, dept } = answers;

                title = initialCaps(title);
                dept = initialCaps(dept);

                const query = new Queries();
                const viewDepartmentIdByName = query.viewDepartmentIdByName();

            database.query(viewDepartmentIdByName, dept).then(rows => {

                dept_id = rows[0].id;

                if (dept_id === undefined) {
                    console.log("The department you entered was not found.")
                    addRole();
                }

                const query = new Queries();
                const insertOrIgnoreRole = query.insertOrIgnoreRole();

                return database.query(insertOrIgnoreRole, [title, salary, dept_id]);

            }).then(rows => {

                    if (rows.insertId !== 0) {
                        console.log("New role added.");
                    }
                    else {
                        console.log("This role already exists. Please enter a different name.");
                        addRole();
                    }

            }).then(() => {
                    askQuestions();
            });

        });

    });

}

const addEmployee = () => {

    const query = new Queries();
    const viewAllRoles = query.viewAllRoles();

    let jobTitleList = [];
    let employeeList = [];
  
    database.query(viewAllRoles).then(rows => {

        if (rows.length > 0) {

            for (let i = 0; i < rows.length; i++) {
                jobTitleList.push(rows[i].title);
            }
    
            const query = new Queries();
            const viewAllEmployeeNames = query.viewAllEmployeeNames();

            return database.query(viewAllEmployeeNames);

        }
        else {
            console.log("You must first add a job role to the database before you can add an employee.");
            askQuestions();
        }

    }).then(rows => {

        employeeList.push('None');

        for (let i = 0; i < rows.length; i++) {
            employeeList.push(rows[i].employee_name);
        }

        let role_id;
        let manager_id;

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is this employee\'s first name?',
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is this employee\'s last name?',
                },
                {
                    type: 'list',
                    name: 'title',
                    message: 'Select a job title for this employee',
                    choices: jobTitleList
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Who is this employee\'s manager?',
                    choices: employeeList
                }
            ])
            .then(answers => {

                let { first_name, last_name, title, manager } = answers;

                first_name = initialCaps(first_name);
                last_name = initialCaps(last_name);

                const query = new Queries();
                const viewRoleIdByName = query.viewRoleIdByName();
            
                database.query(viewRoleIdByName, title).then(rows => {

                    role_id = rows[0].id;

                    if (manager !== 'None') {

                        const index = manager.indexOf(' ');
                        const first_name = manager.substr(0, index);
                        const last_name = manager.substr(index + 1);

                        const query = new Queries();
                        const viewEmployeeIdByName = query.viewEmployeeIdByName();
                    
                        return database.query(viewEmployeeIdByName, [first_name, last_name]);

                    }
                    else {
                        manager_id = null;
                        return manager_id;
                    }

                }).then(rows => {

                    if (rows !== null) {
                        manager_id = rows[0].id;
                    }
                    else {
                        manager_id = null;
                    }

                    const query = new Queries();
                    const insertNewEmployee = query.insertNewEmployee();

                    return database.query(insertNewEmployee, [first_name, last_name, role_id, manager_id]);

                }).then(rows => {
                    
                    if (rows.insertId !== 0) {
                        console.log("New employee added.");
                    }
                    else {
                        console.log("Unable to add new employee.");
                        addRole();
                    }

                }).then(() => {
                    askQuestions();
                });

            });

    });

}

const removeEmployee = () => {

    let employeeList = [];

    const query = new Queries();
    const viewAllEmployeeNames = query.viewAllEmployeeNames();

    database.query(viewAllEmployeeNames).then(rows => {

        if (rows.length > 0) {

            for (let i = 0; i < rows.length; i++) {
                employeeList.push(rows[i].employee_name);
            }

            return employeeList;

        }
        else {
            console.log("There are no employees in the database.");
            askQuestions();
        }

    }).then(employeeList => {

        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Select the employee you want to remove from the database.',
                    choices: employeeList
                }
            ])
            .then(answer => {

                const employee = answer.employee;

                const index = employee.indexOf(' ');
                const first_name = employee.substr(0, index);
                const last_name = employee.substr(index + 1);

                const query = new Queries();
                const viewEmployeeIdByName = query.viewEmployeeIdByName();

                let employee_id;

                database.query(viewEmployeeIdByName, [first_name, last_name]).then(rows => {
                    
                    employee_id = rows[0].id;

                    const query = new Queries();
                    const updateEmployeesUnderRemovedManager = query.updateEmployeesUnderRemovedManager();

                    return database.query(updateEmployeesUnderRemovedManager, employee_id);
                
                }).then(rows => {

                    const query = new Queries();
                    const removeEmployeeById = query.removeEmployeeById();

                    return database.query(removeEmployeeById, employee_id);

                }).then(rows => {

                    if (rows.affectedRows === 1) {
                        console.log("Employee was removed from the database.");
                    }
                    else {
                        console.log("Failed to remove employee from the database.");
                    }

                }).then(() => {
                    askQuestions();
                });

            });

    });

}

const updateEmployeeRole = () => {

    let employeeList = [];
    let jobTitleList = [];
    let employee_id;
    let role_id;

    const query = new Queries();
    const viewAllEmployeeNames = query.viewAllEmployeeNames();

    database.query(viewAllEmployeeNames).then(rows => {

        if (rows.length > 0) {

            for (let i = 0; i < rows.length; i++) {
                employeeList.push(rows[i].employee_name);
            }

            return employeeList;

        }
        else {
            console.log("There are no employees in the database.");
            askQuestions();
        }

    }).then(employeeList => {

        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Select an employee to update their role:',
                    choices: employeeList
                }
            ])
            .then(answer => {
                const { employee } = answer;

                const index = employee.indexOf(' ');
                const first_name = employee.substr(0, index);
                const last_name = employee.substr(index + 1);
                
                const query = new Queries();
                const viewEmployeeIdByName = query.viewEmployeeIdByName();

                database.query(viewEmployeeIdByName, [first_name, last_name]).then(rows => {

                    employee_id = rows[0].id;

                    const query = new Queries();
                    const viewAllRoles = query.viewAllRoles();
                
                    return database.query(viewAllRoles);
                    
                }).then(rows => {

                    for (let i = 0; i < rows.length; i++) {
                        jobTitleList.push(rows[i].title);
                    }

                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'title',
                                message: 'Select a job role to assign to this employee:',
                                choices: jobTitleList
                            }
                        ])
                        .then(answer => {

                            let { title } = answer;
                            
                            const query = new Queries();
                            const viewRoleIdByName = query.viewRoleIdByName();

                            return database.query(viewRoleIdByName, title);

                        }).then(rows => {

                            role_id = rows[0].id;

                            const query = new Queries();
                            const updateEmployeeRoleId = query.updateEmployeeRoleId();
                            
                            return database.query(updateEmployeeRoleId, [role_id, employee_id]);
                                
                        }).then(rows => {

                            if (rows.changedRows === 1) {
                                console.log("Updated employee role");
                            }
                            else {
                                console.log("This employee has already been assigned this role.");
                            }

                        }).then(() => {
                            askQuestions();
                        });

                });
            });

    });

}

const updateEmployeeManager = () => {

    let employeeList = [];
    let managersList = [];
    let employee_id;
    let manager_id;
    let m_first_name;
    let m_last_name;

    const query = new Queries();
    const viewAllEmployeeNames = query.viewAllEmployeeNames();

    database.query(viewAllEmployeeNames).then(rows => {

        if (rows.length > 0) {

            for (let i = 0; i < rows.length; i++) {
                employeeList.push(rows[i].employee_name);
            }

            managersList.push('None');

            for (let i = 0; i < rows.length; i++) {
                managersList.push(rows[i].employee_name);
            }

            return;

        }
        else {
            console.log("There are no employees in the database.");
            askQuestions();
        }

    }).then(() => {

        inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Select the employee whose manager you want to update:',
                choices: employeeList
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Select the manager you want to assign this employee to:',
                choices: managersList
            }
        ])
        .then(answers => {

            const { employee, manager } = answers;

            const index = employee.indexOf(' ');
            const first_name = employee.substr(0, index);
            const last_name = employee.substr(index + 1);

            if (manager !== 'None') {
                const index2 = manager.indexOf(' ');
                m_first_name = manager.substr(0, index2);
                m_last_name = manager.substr(index2 + 1);
            }
            else {
                manager_id = null;
            }

            const query = new Queries();
            const viewEmployeeIdByName = query.viewEmployeeIdByName();

            database.query(viewEmployeeIdByName, [first_name, last_name]).then(rows => {

                employee_id = rows[0].id;

                if (manager_id !== null) {
                    const query = new Queries();
                    const viewEmployeeIdByName = query.viewEmployeeIdByName();

                    return database.query(viewEmployeeIdByName, [m_first_name, m_last_name]);

                }
                else {
                    return manager_id;
                }
                
            }).then(rows => {

                if (rows !== null) {
                    manager_id = rows[0].id;
                }

                if (employee_id === manager_id) {
                    console.log("You cannot assign the same person as a manager to themselves.");
                    askQuestions();
                }
                else {

                    const query = new Queries();
                    const updateEmployeeManagerById = query.updateEmployeeManagerById();

                    return database.query(updateEmployeeManagerById, [manager_id, employee_id]);

                }

            }).then(rows => {
                
                if (rows.changedRows === 1) {
                    console.log("Manager successfully assigned to employee");
                }
                else {
                    console.log("Failed to assign manager to employee.");
                }

            }).then(() => {
                askQuestions();
            });


        });

    });

}

const initialCaps = word => {

    let first_letter = word.substr(0, 1);

    let first_letter_cap = first_letter.toUpperCase();

    let restOfString = word.substr(1);

    let full_word = first_letter_cap + restOfString;

    return full_word;

}

const endExecution = () => {
    database.close();
}

askQuestions();