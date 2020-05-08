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
 
 -- View All Employees by Department --
 SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
 role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
 LEFT JOIN role on employee.role_id = role.id 
 LEFT JOIN department dept on role.department_id = dept.id 
 LEFT JOIN employee manager on manager.id = employee.manager_id
 WHERE dept.name = 'Sales';
 
 -- View All Managers IDs --
SELECT employee.manager_id FROM employee WHERE employee.manager_id IS NOT NULL;
 
-- View Manager's Employees by ID --
SELECT employee.first_name, employee.last_name FROM employee WHERE employee.id = 3;

-- View All Managers --
 SELECT DISTINCT CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
 LEFT JOIN employee manager on manager.id = employee.manager_id
 WHERE employee.manager_id IS NOT NULL;
 
 -- View All Employees By Manager --
 SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
 role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
 LEFT JOIN role on employee.role_id = role.id 
 LEFT JOIN department dept on role.department_id = dept.id 
 LEFT JOIN employee manager on manager.id = employee.manager_id
 WHERE manager.first_name = 'Ashley' AND manager.last_name = 'Rodriguez';
