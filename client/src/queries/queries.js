import gql from "graphql-tag";

export const get_top_posts = gql`
  query postList($after: Int) {
    posts(after: $after) {
      cursor
      hasMore
      posts {
        title
        id
        user
        url
        score
        comments
        time
        cursor
      }
    }
  }
`;

export const get_direct_comments = gql`
  query commentList($id: Int!, $after: Int) {
    comments(id: $id, after: $after) {
      title
      score
      by
      text
      url
      cursor
      hasMore
      comments {
        text
        id
        user
      }
    }
  }
`;

export const get_subcomments = gql`
  query subcommentList($id: Int!, $after: Int) {
    comments(id: $id, after: $after) {
      by
      text
      cursor
      hasMore
      comments {
        text
        id
        user
      }
    }
  }
`;
