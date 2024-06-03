require('dotenv').config();
const { Pool } = require("pg");

// Log the environment variables to verify
console.log('Database Source:', process.env.DB_SOURCE);

const pool = new Pool({
  connectionString: process.env.DB_SOURCE,
});

// server/createTables.js
// const pool = require("./config/database");

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Courses (
          course_id SERIAL PRIMARY KEY,
          course_name VARCHAR(255) NOT NULL,
          course_code VARCHAR(50) UNIQUE NOT NULL,
          section_code VARCHAR(50),
          campus VARCHAR(50),
          sessions TEXT[], -- An array to store multiple sessions
          description TEXT,
          title VARCHAR(255),
          level_of_instruction VARCHAR(50),
          prerequisites_text TEXT,
          corequisites_text TEXT,
          exclusions_text TEXT,
          recommended_preparation TEXT,
          division VARCHAR(100),
          faculty_name VARCHAR(100),
          breadth_requirements TEXT[],
          distribution_requirements TEXT[],
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS Sections (
          section_id SERIAL PRIMARY KEY,
          course_id INT REFERENCES Courses(course_id) ON DELETE CASCADE,
          name VARCHAR(50),
          type VARCHAR(50),
          section_number VARCHAR(10),
          current_enrolment INT,
          max_enrolment INT,
          teach_method VARCHAR(50),
          current_waitlist INT,
          sub_title TEXT,
          enrolment_ind VARCHAR(50),
          cancel_ind VARCHAR(50),
          waitlist_ind VARCHAR(50),
          delivery_modes TEXT[],
          notes TEXT[],
          enrolment_controls TEXT[],
          linked_meeting_sections TEXT[]
      );
      
      CREATE TABLE IF NOT EXISTS MeetingTimes (
          meeting_time_id SERIAL PRIMARY KEY,
          section_id INT REFERENCES Sections(section_id) ON DELETE CASCADE,
          start_day INT,
          start_time INT,
          end_day INT,
          end_time INT,
          building_code VARCHAR(50),
          building_room_number VARCHAR(50),
          building_url TEXT,
          session_code VARCHAR(50)
      );
      
      CREATE TABLE IF NOT EXISTS Instructors (
          instructor_id SERIAL PRIMARY KEY,
          section_id INT REFERENCES Sections(section_id) ON DELETE CASCADE,
          first_name VARCHAR(50),
          last_name VARCHAR(50)
      );
      
      CREATE TABLE IF NOT EXISTS Buildings (
          building_id SERIAL PRIMARY KEY,
          building_code VARCHAR(50) UNIQUE NOT NULL,
          building_room_number VARCHAR(50),
          building_url TEXT
      );
      
      CREATE TABLE IF NOT EXISTS Notes (
          note_id SERIAL PRIMARY KEY,
          course_id INT REFERENCES Courses(course_id) ON DELETE CASCADE,
          type VARCHAR(50),
          content TEXT
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
