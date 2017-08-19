CREATE TABLE employees (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	job_title VARCHAR(100) NOT NULL,
	annual_salary VARCHAR(100) NOT NULL
);