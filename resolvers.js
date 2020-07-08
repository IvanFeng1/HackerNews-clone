const { paginateResults } = require("./utils");

module.exports = {
  Query: {
    posts: async (_, { pageSize = 20, after }, { dataSources }) => {
      const topPosts = await dataSources.hackerAPI.getTopStories();
      // we want these in reverse chronological order
      const posts = paginateResults({
        after,
        pageSize,
        results: topPosts,
      });
      return {
        posts,
        cursor: posts.length ? posts[posts.length - 1].cursor : null,
        // if the cursor at the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: posts.length
          ? posts[posts.length - 1].cursor !==
            topPosts[topPosts.length - 1].cursor
          : false,
      };
    },
    comments: async (_, { id, pageSize = 20, after }, { dataSources }) => {
      const response = await dataSources.hackerAPI.getDirectComments(id);
      const title = response.title;
      const score = response.score;
      const by = response.by;
      const url = response.url;
      const text = response.text;
      const topComments = response.comments;
      const comments = paginateResults({
        after,
        pageSize,
        results: topComments,
      });
      return {
        title,
        score,
        by,
        url,
        text,
        comments,
        cursor: comments.length ? comments[comments.length - 1].cursor : null,
        // if the cursor at the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: comments.length
          ? comments[comments.length - 1].cursor !==
            topComments[topComments.length - 1].cursor
          : false,
      };
    },
    subcomments: async (_, { id }, { dataSources }) => {
      const response = await dataSources.hackerAPI.getSubcomments(id);
      var childComments = response;
      return {
        childComments,
      };
    },
  },
};
