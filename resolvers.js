const { paginateResults } = require("./utils");

module.exports = {
  Query: {
    posts: async (_, { pageSize = 20, after }, { dataSources }) => {
      const topPosts = await dataSources.hackerAPI.getTopStories();
      // we want these in reverse chronological order
      topPosts.reverse();
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
  },
};
