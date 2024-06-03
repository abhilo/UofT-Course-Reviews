// server/config/database.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "coursedata",
  password: "",
  port: 5432,
});

// server/createTables.js
// const pool = require("./config/database");

const createTables = async () => {
  try {
    // possible last login
    await pool.query(`
            CREATE TABLE IF NOT EXISTS Users (
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    // Courses table - done
    await pool.query(`
            CREATE TABLE IF NOT EXISTS Courses (
                course_id SERIAL PRIMARY KEY,
                course_name VARCHAR(255) NOT NULL,
                course_code VARCHAR(50) UNIQUE NOT NULL,
                description TEXT
            );
        `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS Reviews (
            review_id SERIAL PRIMARY KEY,
            course_id INT REFERENCES Courses(course_id) ON DELETE CASCADE,
            user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
            rating INT CHECK (rating >= 1 AND rating <= 5),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (course_id, user_id)
        );
    `);

    // Comments table - done
    await pool.query(`
            CREATE TABLE IF NOT EXISTS Comments (
                comment_id SERIAL PRIMARY KEY,
                review_id INT REFERENCES Reviews(review_id) ON DELETE CASCADE,
                user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
                comment_text TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables", err);
  } finally {
    pool.end();
  }
};

createTables();
