const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    posts(pageSize: Int, after: Int): PostConnection!
    comments(id: Int, pageSize: Int, after: Int): CommentConnection!
    subcomments(id: Int): Subcomment
  }
  type PostConnection {
    cursor: Int! # time the post was uploaded
    hasMore: Boolean!
    posts: [Post]!
  }
  type CommentConnection {
    title: String
    score: Int
    by: String!
    url: String
    cursor: Int
    hasMore: Boolean!
    text: String
    comments: [Comment]
  }
  type Post {
    title: String!
    id: Int!
    user: String!
    url: String
    score: Int!
    comments: Int
    time: Int!
    cursor: Int
  }

  type Comment {
    text: String!
    user: String!
    id: Int!
    cursor: Int
    childComments: [Int]
  }

  type Subcomment {
    childComments: [Comment]
  }
`;

module.exports = typeDefs;
