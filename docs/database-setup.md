# Database Setup

To set up the database for the Node.js server, follow these steps:

1. **Create a New Database:** Run the following SQL script to create a new database named `user_administrator_db` and a table called `users` with the specified fields:

sql
-- Create the new database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS user_administrator_db;

-- Use the newly created database
USE user_administrator_db;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
firstName VARCHAR(50) NOT NULL,
lastName VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
password VARCHAR(255) NOT NULL
);

2. **Run the Script:** Execute the SQL script in your MySQL database management tool (such as MySQL Workbench or phpMyAdmin) or directly from the MySQL command line interface (CLI) to create the database and table with the specified schema.

3. **Verify:** Once the script has been executed successfully, you can verify that the `user_administrator_db` database and `users` table have been created with the specified fields.
