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
  return courses;
}

function createCourse(course) {
  const courses = readData();
  const fields = [
    "courseCode",
    "title",
    "hours",
    "summary",
    "prerequisites",
    "exclusions",
    "recommended",
    "distribution",
    "breadth",
    "program",
  ];

  for (const field of fields) {
    if (!course.hasOwnProperty(field)) {
      throw new Error(`Course missing field: ${field}`);
    }
  }

  if (courses[course.courseCode]) {
    throw new Error("Course existed");
  }

  courses[course.courseCode] = course;

  writeData(courses);
}

module.exports = { getCourseByID, getCourses, createCourse };
