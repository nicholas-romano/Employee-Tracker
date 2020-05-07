USE employee_tracker_cms;

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;

-- View All Employees --
 SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
 role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
 LEFT JOIN role on employee.role_id = role.id 
 LEFT JOIN department dept on role.department_id = dept.id 
 LEFT JOIN employee manager on manager.id = employee.manager_id;
