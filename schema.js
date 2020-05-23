const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    posts(pageSize: Int, after: Int): PostConnection!
  }

  type PostConnection {
    cursor: Int! # time the post was uploaded
    hasMore: Boolean!
    posts: [Post]!
  }

  type Post {
    title: String!
    id: Int!
    user: String!
    url: String
    cursor: Int
  }

  # type Comment {
  #   content: String!
  #   user: String!
  #   id: Int!
  #   childComments: [Comment]
  # }
`;

module.exports = typeDefs;
