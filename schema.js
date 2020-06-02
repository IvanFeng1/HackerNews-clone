const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    posts(pageSize: Int, after: Int): PostConnection!
    comments(id: Int!): [Comment]
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
    comments: Int
    upvotes: Int
  }

  type Comment {
    text: String!
    user: String!
    id: Int!
    childComments: [Int]
  }
`;

module.exports = typeDefs;
