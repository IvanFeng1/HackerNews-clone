const { RESTDataSource } = require("apollo-datasource-rest");

class HackerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://hacker-news.firebaseio.com/v0/";
  }

  async postConverter(id) {
    // converts post ID to a post object
    const postResponse = await this.get(`item/${id}.json?print=pretty`);
    return {
      title: postResponse.title,
      id: postResponse.id,
      user: postResponse.by,
      url: postResponse.url,
      cursor: postResponse.time,
    };
  }

  async getTopStories() {
    const response = await this.get("topstories.json?print=pretty"); // getting the list of IDs that correspond to the top stories on hackernews at the time
    var postArray = [];
    // if (Array.isArray(response)) {
    for (var i = 0; i < 50; i++) {
      var post = await this.postConverter(response[i]);
      postArray.push(post);
    }
    // }
    return postArray;
  }
}

module.exports = HackerAPI;
