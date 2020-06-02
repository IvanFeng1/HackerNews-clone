const { RESTDataSource } = require("apollo-datasource-rest");
var he = require("he"); // html entities converter
class HackerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://hacker-news.firebaseio.com/v0/";
  }

  async postConverter(id) {
    /* (int) -> Object 
    converts post ID to a post object */
    const postResponse = await this.get(`item/${id}.json?print=pretty`);
    return {
      title: postResponse.title,
      id: postResponse.id,
      user: postResponse.by,
      url: postResponse.url,
      cursor: postResponse.time,
      comments: postResponse.descendants,
      upvotes: postResponse.score,
    };
  }

  async getTopStories() {
    /* () -> array of Post objects
    queries the hacker news api for the top 50 stories currently.
    Parses each story with postConverter(id) and returns an array
    of 50 Post objects */
    const response = await this.get("topstories.json?print=pretty"); // getting the list of IDs that correspond to the top stories on hackernews at the time
    var postArray = [];
    for (var i = 0; i < 50; i++) {
      var post = await this.postConverter(response[i]);
      postArray.push(post);
    }
    return postArray;
  }

  commentTextFormatter(rawText) {
    /* (string) -> string
    takes in a string with html entities and returns same string with the html entities converted */
    return he.decode(rawText);
  }

  async getDirectComments(id) {
    // (int) -> Array
    /* takes in an id of a post and returns an array of comments */
    /* TODO return array of comments  */
    /* type Comment {
      text: String!
      user: String!
      id: Int!
      childComments: [Int]
    }
    */
    const response = await this.get(`item/${id}.json`); // raw response of the post
    var childComments = response.kids; // array of IDs that correspond to the child comments of this post
    console.log(`childComments ${childComments}`);
    var commentResponse; // raw response of comment
    var user; // user that write comment
    var text; // text content of the comment
    var id; // id of the comment
    var commentArray = []; // list of direct comments to this post
    for (var i = 0; i < childComments.length; i++) {
      commentResponse = await this.get(`item/${childComments[i]}.json`);
      if (commentResponse.deleted) {
      } else {
        commentArray.push({
          text: this.commentTextFormatter(commentResponse.text),
          user: commentResponse.by,
          id: commentResponse.id,
          childComments: commentResponse.kids, // child comments that correspond to this comment
        });
      }
    }

    return commentArray;
  }
}

module.exports = HackerAPI;
