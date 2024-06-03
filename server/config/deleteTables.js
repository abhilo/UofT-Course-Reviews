require('dotenv').config();
const { Pool } = require("pg");

// Log the environment variables to verify
console.log('Database Source:', process.env.DB_SOURCE);

const pool = new Pool({
  connectionString: process.env.DB_SOURCE,
});

// server/createTables.js
// const pool = require("./config/database");

const deleteTables = async () => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS Comments;
    `);

    await pool.query(`
      DROP TABLE IF EXISTS Reviews;
    `);

    await pool.query(`
      DROP TABLE IF EXISTS Courses;
    `);

    await pool.query(`
        DROP TABLE IF EXISTS Users;
    `);

    console.log("Tables deleted successfully");
  } catch (err) {
    console.error("Error deleting tables", err);
  } finally {
    pool.end();
  }
};

deleteTables();
