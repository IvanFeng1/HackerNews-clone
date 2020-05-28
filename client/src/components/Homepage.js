import React, { Fragment } from "react";
import { Waypoint } from "react-waypoint";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// makeStyles for styling components, CssBaseline because it makes site look nice
// Container for maxwidth
import { makeStyles, Button, CssBaseline, Container } from "@material-ui/core/";

// components
import PostTile from "./PostTile.js";
import Header from "./Header.js";

const get_top_posts = gql`
  query postList($after: Int) {
    posts(after: $after) {
      cursor
      hasMore
      posts {
        title
        id
        user
        url
        cursor
      }
    }
  }
`;

function Homepage() {
  // notifyOnNetworkStatusChange: To make "loading" true when "fetchMore" runs.
  // loading is true only on the first request on default behavior.
  // fetchMore doesn't affect "loading" by default.
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    get_top_posts,
    {
      notifyOnNetworkStatusChange: true,
    }
  );
  if (loading && networkStatus != 3) return <p>loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  console.log(networkStatus);
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Header />
        <div>
          {data.posts &&
            data.posts.posts &&
            data.posts.posts.map((post, i) => (
              <Fragment key={post.id + 10000}>
                {/* add 10000 to avoid the same key warning */}
                {/* PostTile is a block that contains the information of each
                individual post */}
                <PostTile
                  title={post.title}
                  id={post.id}
                  user={post.user}
                  url={post.url}
                />
                {/* 19 should be the last element of the first page of posts*/}
                {i % 19 === 0 && i != 0 && data.posts.hasMore && (
                  <Waypoint
                    onEnter={() =>
                      fetchMore({
                        variables: {
                          after: data.posts.cursor,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;
                          return {
                            ...fetchMoreResult,
                            posts: {
                              ...fetchMoreResult.posts,
                              posts: [
                                ...prev.posts.posts,
                                ...fetchMoreResult.posts.posts,
                              ],
                            },
                          };
                        },
                      })
                    }
                  />
                )}
              </Fragment>
            ))}
          {/* the code from here until load more is the code for loading additional posts onto the page */}
        </div>
      </Container>
    </Fragment>
  );
}

export default Homepage;
