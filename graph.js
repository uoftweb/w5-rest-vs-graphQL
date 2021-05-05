const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const utils = require("./utils");

const app = express();

const PORT = 4003;


// CODE STARTS FROM HERE






// CODE ENDS HERE

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ utils: utils }),
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`Now browse to http://localhost:${PORT}${server.graphqlPath}`)
);
