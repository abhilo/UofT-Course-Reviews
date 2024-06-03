require('dotenv').config();
const { Pool } = require("pg");
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DB_SOURCE,
});

const insertCourseData = async (courseData) => {
  const { name, code, sectionCode, campus, sessions, sections, cmCourseInfo, faculty, breadths, notes } = courseData;
  const {
    description,
    title,
    levelOfInstruction,
    prerequisitesText,
    corequisitesText,
    exclusionsText,
    recommendedPreparation,
    division,
    breadthRequirements,
    distributionRequirements
  } = cmCourseInfo;

  try {
    const courseResult = await pool.query(`
      INSERT INTO Courses (
        course_name, course_code, section_code, campus, sessions, description, title, level_of_instruction,
        prerequisites_text, corequisites_text, exclusions_text, recommended_preparation, division,
        faculty_name, breadth_requirements, distribution_requirements
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      ON CONFLICT (course_code) DO NOTHING
      RETURNING course_id
    `, [
      name, code, sectionCode, campus, sessions, description, title, levelOfInstruction, prerequisitesText,
      corequisitesText, exclusionsText, recommendedPreparation, division, faculty.name, breadthRequirements,
      distributionRequirements
    ]);

    if (courseResult.rows.length === 0) {
      console.log(`Course ${code} already exists.`);
      return;
    }

    const courseId = courseResult.rows[0].course_id;

    for (const section of sections) {
      const sectionResult = await pool.query(`
        INSERT INTO Sections (
          course_id, name, type, section_number, current_enrolment, max_enrolment, teach_method,
          current_waitlist, sub_title, enrolment_ind, cancel_ind, waitlist_ind, delivery_modes, notes,
          enrolment_controls, linked_meeting_sections
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING section_id
      `, [
        courseId, section.name, section.type, section.sectionNumber, section.currentEnrolment,
        section.maxEnrolment, section.teachMethod, section.currentWaitlist, section.subTitle,
        section.enrolmentInd, section.cancelInd, section.waitlistInd, section.deliveryModes,
        section.notes, section.enrolmentControls, section.linkedMeetingSections
      ]);

      const sectionId = sectionResult.rows[0].section_id;

      for (const meetingTime of section.meetingTimes) {
        await pool.query(`
          INSERT INTO MeetingTimes (
            section_id, start_day, start_time, end_day, end_time, building_code,
            building_room_number, building_url, session_code
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [
          sectionId, meetingTime.start.day, meetingTime.start.millisofday, meetingTime.end.day,
          meetingTime.end.millisofday, meetingTime.building.buildingCode, meetingTime.building.buildingRoomNumber,
          meetingTime.building.buildingUrl, meetingTime.sessionCode
        ]);
      }

      for (const instructor of section.instructors) {
        await pool.query(`
          INSERT INTO Instructors (
            section_id, first_name, last_name
          ) VALUES ($1, $2, $3)
        `, [sectionId, instructor.firstName, instructor.lastName]);
      }
    }

    for (const note of notes) {
      await pool.query(`
        INSERT INTO Notes (
          course_id, type, content
        ) VALUES ($1, $2, $3)
      `, [courseId, note.type, note.content]);
    }

    console.log(`Inserted course: ${title}`);
  } catch (err) {
    console.error(`Error inserting course: ${title}`, err);
  }
};

const processFiles = async () => {
  const dirPath = path.join(__dirname, '../data/courses');
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(dirPath, file);
      const fileData = fs.readFileSync(filePath);
      const jsonData = JSON.parse(fileData);

      for (const course of jsonData.courses) {
        await insertCourseData(course);
      }
    }
  }

  pool.end();
};

processFiles();
