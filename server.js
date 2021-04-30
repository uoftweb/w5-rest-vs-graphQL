const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const CourseAPI = require("./restOps")

 
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

  type Query {
    courseByID(id: String!): Course!
  }
`;

const resolvers = {
  Query: {
    courseByID: async (_source, { id }, { dataSources }) => {
      return dataSources.courseAPI.getCourse(id);
    },
  },
};
 
const server = new ApolloServer({ typeDefs, resolvers, dataSources: () => {
  return {
    courseAPI: new CourseAPI()
  };
} });
 
const app = express();
server.applyMiddleware({ app });
 
app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
