const typeDefs = require("./schema");
const HackerAPI = require("./datasources/hacker.js");
const resolvers = require("./resolvers.js");

require("dotenv").config();
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    hackerAPI: new HackerAPI(),
  }),
  engine: {
    apiKey: process.env.APOLLO_KEY,
    graphVariant: process.env.NODE_ENV,
    reportSchema: true,
  },
  cors: true,
});

// server.listen().then(({ url }) => {
//   console.log(url);
// });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
