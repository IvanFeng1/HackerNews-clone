const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    posts: [Post]
  }

  type Post {
    title: String!
    id: Int!
    user: String!
    url: String
  }

  # type Comment {
  #   content: String!
  #   user: String!
  #   id: Int!
  #   childComments: [Comment]
  # }
`;

module.exports = typeDefs;
