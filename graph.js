const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const utils = require("./utils");

const app = express();


const PORT = 4003;

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ utils: utils }),
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`Now browse to http://localhost:${PORT}${server.graphqlPath}`)
);
