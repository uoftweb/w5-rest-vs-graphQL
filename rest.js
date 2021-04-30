const express = require("express");
const utils = require("./utils");

const app = express();
app.use(express.json());

const PORT = 4004;

// Get a course by ID
app.get("/courses/:id", function (req, res) {
  const id = req.params.id;
  const course = utils.getCourseByID(id);
  res.send(course);
});

// Get all courses
app.get("/courses", function (req, res) {
  const courses = utils.getCourses();
  res.send(courses);
});

// Create a new course
app.post("/courses", function (req, res) {
  let response;
  try {
    utils.createCourse(req.body);
    response = { status: "success" };
  } catch (error) {
    response = { status: "failure", error: error.message };
  }
  res.send(response);
});

app.listen({ port: PORT }, () =>
  console.log(`Now browse to http://localhost:${PORT}`)
);
