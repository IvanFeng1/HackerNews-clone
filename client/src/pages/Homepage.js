import React, { Fragment } from "react";
import { Waypoint } from "react-waypoint"; // need this for infinite scrolling
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Helmet } from "react-helmet"; // need this to set background color

// makeStyles for styling components, CssBaseline because it makes site look nice
// Container for maxwidth
import {
  makeStyles,
  CssBaseline,
  Container,
  CircularProgress,
} from "@material-ui/core/";

// components
import PostTile from "../components/PostTile.js";
import Header from "../components/Header.js";
import Loading from "../components/Loading.js";
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
        comments
        upvotes
      }
    }
  }
`;

const useStyles = makeStyles({
  smallLoaderLoop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "3em 0em 3em 0em",
  },
});

function Homepage() {
  const classes = useStyles();
  // notifyOnNetworkStatusChange: To make "loading" true when "fetchMore" runs.
  // loading is true only on the first request on default behavior.
  // fetchMore doesn't affect "loading" by default.
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    get_top_posts,
    {
      notifyOnNetworkStatusChange: true,
    }
  );
  if (loading && networkStatus != 3) return <Loading />;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div className="application">
      <Helmet>
        {/* need this to set the entire background color */}
        <style>{"body {background-color: #2E3047; "}</style>
      </Helmet>
      <CssBaseline />
      <Header />
      <Container maxWidth="md">
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
                  comments={post.comments}
                  upvotes={post.upvotes}
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
        </div>

        {/* adding loading indicator for when the next page is loading */}
        <Container className={classes.smallLoaderLoop}>
          {networkStatus === 3 && <CircularProgress />}
        </Container>
      </Container>
    </div>
  );
}

export default Homepage;
