const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const utils = require("./utils");

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
    courseByID(id: String!): Course!
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

const app = express();
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`Now browse to http://localhost:${PORT}${server.graphqlPath}`)
);
