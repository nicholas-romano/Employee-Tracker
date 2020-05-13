USE employee_tracker_cms;

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;

SELECT role.id, role.title FROM role;

SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name FROM employee;
 
-- View All Managers IDs --
SELECT employee.manager_id FROM employee WHERE employee.manager_id IS NOT NULL;
 
-- View Manager's Employees by ID --
SELECT employee.first_name, employee.last_name FROM employee WHERE employee.id = 2;

-- View Manager ID by Name --
SELECT employee.id AS manager_id FROM employee WHERE employee.first_name = 'Ashley' AND employee.last_name = 'Rodriguez';

-- Insert New Department if it doesn't already exist --
INSERT IGNORE INTO department (name) VALUES ('Tech Support');

-- Insert New Role if it doesn't already exist --
INSERT IGNORE INTO role (title, salary, department_id) VALUES ('Front End Developer', 90000, 3);

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
ALTER TABLE department AUTO_INCREMENT = 6;
ALTER TABLE role AUTO_INCREMENT = 13;
ALTER TABLE employee AUTO_INCREMENT = 14;

DELETE FROM role WHERE role.id = 13;

-- Resetting employee id --
UPDATE employee SET employee.id = 8 WHERE employee.id = 9;

-- Display all role titles -- 
SELECT title from role;

-- Select Department Id By Department Name --
UPDATE department SET department.id = 5 WHERE department.name = 'Tech Support';

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

-- Check For Duplicate Rows --
SELECT role.title FROM role WHERE role.title = 'Sales Lead';

-- Update Employee Manager --
UPDATE employee SET employee.manager_id = null WHERE employee.id = 1;

-- Adding a new record to Employees Table and setting the id --
INSERT INTO role (id, title, salary, department_id) 
VALUES (8, "Paralegal", "80000", 4); 