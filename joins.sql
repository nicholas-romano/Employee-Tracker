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
SELECT department.name AS department FROM department;
 
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

-- View Manager ID by Name --
SELECT employee.id AS manager_id FROM employee WHERE employee.first_name = 'Ashley' AND employee.last_name = 'Rodriguez';

-- View All Managers --
SELECT DISTINCT employee.manager_id AS manager_id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
LEFT JOIN employee manager on manager.id = employee.manager_id
WHERE employee.manager_id IS NOT NULL;
 
-- View All Employees By Manager --
SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
LEFT JOIN role on employee.role_id = role.id 
LEFT JOIN department dept on role.department_id = dept.id 
LEFT JOIN employee manager on manager.id = employee.manager_id
WHERE manager.first_name = 'Ashley' AND manager.last_name = 'Rodriguez';

-- Insert New Department if it doesn't already exist --
INSERT INTO role (title) VALUES ('Lawyer');

-- Select department Id by department name --
SELECT department.id FROM department WHERE department.name = 'Sales';

-- View Title id by Name --
SELECT role.id FROM role WHERE role.title = 'Lawyer';

-- View department id by name --
SELECT department.id FROM department WHERE department.name = 'IT';

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;

delete from department where department.id = 5;
delete from role where role.id = 8;

ALTER TABLE department AUTO_INCREMENT = 5;
ALTER TABLE role AUTO_INCREMENT = 8;

SELECT department.id FROM department WHERE department.name = 'Engineering';

ALTER TABLE department AUTO_INCREMENT = 5;
ALTER TABLE role AUTO_INCREMENT = 8;

-- Display all role titles -- 
SELECT title from role;