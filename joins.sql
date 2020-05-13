USE employee_tracker_cms;

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;

SELECT role.id, role.title FROM role;

SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name FROM employee;

update role set salary = 150000 WHERE title = 'Senior lawyer';

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

-- View All Employees By Mangager ID --
SELECT employee.id, employee.first_name, employee.last_name, role.title, dept.name AS department, 
      role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
      LEFT JOIN role on employee.role_id = role.id 
      LEFT JOIN department dept on role.department_id = dept.id 
      LEFT JOIN employee manager on manager.id = employee.manager_id
      WHERE manager.id = 1;
 
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

-- View employee id by name --
SELECT employee.id FROM employee WHERE employee.first_name = 'Mike' AND employee.last_name = 'Chan';

-- Select Role Id By Role Name --
SELECT role.id FROM role WHERE role.title = 'Software Engineer';

-- Delete Record from Table --
delete from department where department.id = 5;
delete from role where role.id = 9;
delete from employee where employee.id = 9;

-- SELECT Department Id By Department Name --
SELECT department.id FROM department WHERE department.name = 'Engineering';

-- Resetting Auto Increment --
ALTER TABLE department AUTO_INCREMENT = 9;
ALTER TABLE role AUTO_INCREMENT = 8;
ALTER TABLE employee AUTO_INCREMENT = 9;

-- Resetting employee id --
UPDATE employee SET employee.id = 8 WHERE employee.id = 9;

-- Display all role titles -- 
SELECT title from role;

-- Select Department Id By Department Name --
SELECT department.id FROM department WHERE department.name = 'Engineering';

-- SELECT employee first name and last name from employee table --
SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name FROM employee;

-- Set all manager_ids to null when a manager is removed --
SELECT * FROM employee;
SELECT * FROM employee WHERE manager_id = 3;
UPDATE employee SET employee.manager_id = null WHERE employee.manager_id = 3;

-- Remove Employee from Employee Table --
DELETE FROM employee WHERE employee.id = ?;

-- Remove Department from Department Table step 1 --
DELETE FROM department WHERE department.id = ?;
UPDATE role SET department_id = null WHERE department_id = ?;

-- Remove Department from Department Table step 2 --
SELECT id FROM role WHERE department_id = 11;
UPDATE role SET department_id = null WHERE id = 20;

USE employee_tracker_cms;

select * from employee;
select * from role;
select * from department;

-- Check For Duplicate Rows --
SELECT role.title FROM role WHERE role.title = 'Sales Lead';

-- Update Employee Manager --
UPDATE employee SET employee.manager_id = null WHERE employee.id = 1;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
VALUES (3, "Ashley", "Rodriguez", 3, null); 