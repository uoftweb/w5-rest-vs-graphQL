####### CODE SOLUTION STARTS FROM HERE ###################


app.get("/courses/:id", function (req, res) {
  const id = req.params.id;
  const course = utils.getCourseByID(id);
  res.send(course);
});

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


---------------------------GRAPHQL BELOW--------------------------------

####### CODE SOLUTION STARTS FROM HERE #################

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
    createCourse(course: CourseInput): Course!
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
      utils.createCourse(course);
      return course;
    },
  },
};
