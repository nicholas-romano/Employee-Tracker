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

-- View All Departments --
SELECT department.id, department.name AS department FROM department;

-- View All Employees By Role Id --
SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
LEFT JOIN role on employee.role_id = role.id 
LEFT JOIN department dept on role.department_id = dept.id 
LEFT JOIN employee manager on manager.id = employee.manager_id
WHERE role.id = 2;
 
-- View All Employees by Department Id --
SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
LEFT JOIN role on employee.role_id = role.id 
LEFT JOIN department dept on role.department_id = dept.id 
LEFT JOIN employee manager on manager.id = employee.manager_id
WHERE dept.id = 11;

-- View All Employees By Manager ID --
SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
LEFT JOIN role on employee.role_id = role.id 
LEFT JOIN department dept on role.department_id = dept.id 
LEFT JOIN employee manager on manager.id = employee.manager_id
WHERE manager.id = 1;

-- View All Managers --
SELECT DISTINCT employee.manager_id AS manager_id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
LEFT JOIN employee manager on manager.id = employee.manager_id
WHERE employee.manager_id IS NOT NULL;
 
-- View All Employees By Manager Name --
SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
LEFT JOIN role on employee.role_id = role.id 
LEFT JOIN department dept on role.department_id = dept.id 
LEFT JOIN employee manager on manager.id = employee.manager_id
WHERE manager.first_name = 'Ashley' AND manager.last_name = 'Rodriguez';