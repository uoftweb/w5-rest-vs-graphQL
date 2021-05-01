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


#############################################################


const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const utils = require("./utils");

const app = express();
server.applyMiddleware({ app });

const PORT = 4003;

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Course {
    courseCode: String!
    title: String!
    hours: String!
    summary: String!
    prerequisites: String
    exclusions: String
    recommended: String
    distribution: String!
    breadth: String!
    program: String!
  }

  input CourseInput {
    courseCode: String!
    title: String!
    hours: String!
    summary: String!
    prerequisites: String
    exclusions: String
    recommended: String
    distribution: String!
    breadth: String!
    program: String!
  }

  type Query {
    courseByID(id: String!): Course
    allCourses: [Course]
  }

  type Mutation {
    createCourse(course: CourseInput): Course
  }
`;

const resolvers = {
  Query: {
    courseByID: async (_source, { id }, { utils }) => {
      return utils.getCourseByID(id);
    },
    allCourses: async (_source, _, { utils }) => {
      return utils.getCourses();
    },
  },
  Mutation: {
    createCourse: async (_source, { course }, { utils }) => {
      let response;
      try {
        utils.createCourse(course);
        response = { status: "success" };
      } catch (error) {
        response = { status: "failure", error: error.message };
      }

      return {
        success: response.status == "success",
        message: response.message,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ utils: utils }),
});

app.listen({ port: PORT }, () =>
  console.log(`Now browse to http://localhost:${PORT}${server.graphqlPath}`)
);
