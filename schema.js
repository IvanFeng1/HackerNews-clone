const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    posts(pageSize: Int, after: Int): PostConnection!
    comments(id: Int, pageSize: Int, after: Int): CommentConnection!
  }
  type PostConnection {
    cursor: Int! # time the post was uploaded
    hasMore: Boolean!
    posts: [Post]!
  }
  type CommentConnection {
    title: String!
    score: Int!
    by: String!
    cursor: Int!
    hasMore: Boolean!
    comments: [Comment]!
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
    cursor: Int
    childComments: [Int]
  }
`;

module.exports = typeDefs;
