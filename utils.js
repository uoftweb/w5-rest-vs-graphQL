const fs = require("fs");

function readData() {
  const rawdata = fs.readFileSync("data.json");
  return JSON.parse(rawdata);
}

function writeData(courses) {
  fs.writeFileSync("data.json", JSON.stringify(courses));
}

function getCourseByID(id) {
  const courses = readData();
  return courses[id];
}

function getCourses(id) {
  const courses = readData();
  return Object.values(courses);
}

function validateCourse(courses, newCourse) {
  const fields = [
    "courseCode",
    "title",
    "hours",
    "summary",
    "distribution",
    "breadth",
    "program",
  ];
  for (const field of fields) {

    if (newCourse[field] == undefined) {
      throw new Error(`Course missing field: ${field}`);
    }
  }

  if (courses[newCourse.courseCode]) {
    throw new Error("Course exists");
  }
}

function createCourse(course) {
  const courseData = readData();
  validateCourse(courseData, course);

  courseData[course.courseCode] = course;

  writeData(courseData);
}

module.exports = { getCourseByID, getCourses, createCourse };
