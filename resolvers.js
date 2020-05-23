module.exports = {
  Query: {
    posts: (_, __, { dataSources }) => dataSources.hackerAPI.getTopStories(),
  },
};
