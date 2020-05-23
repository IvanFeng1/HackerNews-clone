const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const HackerAPI = require("./datasources/hacker.js");
const resolvers = require("./resolvers.js");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    hackerAPI: new HackerAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(url);
});
