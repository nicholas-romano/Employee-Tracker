class Queries {

    viewAllEmployees() {
      return `SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
      role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
      LEFT JOIN role on employee.role_id = role.id 
      LEFT JOIN department dept on role.department_id = dept.id 
      LEFT JOIN employee manager on manager.id = employee.manager_id`;
    };

    viewAllEmployeesByDept() {
      return `SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
      role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
      LEFT JOIN role on employee.role_id = role.id 
      LEFT JOIN department dept on role.department_id = dept.id 
      LEFT JOIN employee manager on manager.id = employee.manager_id
      WHERE dept.name = ?`;
    }

    viewAllManagers() {
      return `SELECT DISTINCT CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
      LEFT JOIN employee manager on manager.id = employee.manager_id
      WHERE employee.manager_id IS NOT NULL`;
    }

    viewAllEmployeesByManager() {
      return ` SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
      role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
      LEFT JOIN role on employee.role_id = role.id 
      LEFT JOIN department dept on role.department_id = dept.id 
      LEFT JOIN employee manager on manager.id = employee.manager_id
      WHERE manager.first_name = ? AND manager.last_name = ?`;
    }
}

module.exports = Queries;