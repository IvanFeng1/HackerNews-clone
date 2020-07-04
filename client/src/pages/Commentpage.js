import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet"; // need this to set background color
import { Waypoint } from "react-waypoint"; // need this for infinite scrolling
import {
  makeStyles,
  CssBaseline,
  Button,
  Container,
  Typography,
  Link,
  Grid,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { get_direct_comments } from "../queries/queries.js";
// components
import Header from "../components/Header.js";
import Loading from "../components/Loading.js";
import CommentTile from "../components/CommentTile.js";

const useStyles = makeStyles({
  root: {
    minWidth: 150,
    padding: "1.8em",
    margin: "0em 1em 1em 1em",
    background: "#43455C",
  },

  underline: {
    color: "#a3add4",
  },
  comments: {
    minWidth: 150,
    margin: "1em",
    background: "#43455c",
  },
  commentsNum: {
    minWidth: 150,
    margin: "0em 1em 0em 1em",
    padding: "1em",
  },
});
function Commentpage(props) {
  const classes = useStyles();
  const itemID = props.match.params.id; // id of the current thread
  const { loading, error, data, networkStatus, fetchMore } = useQuery(
    get_direct_comments,
    {
      variables: {
        id: parseInt(itemID), // parseInt makes query work
      },
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

      <Container width="md">
        {data.comments && data.comments.comments && (
          <Grid className={classes.root}>
            <Link href={data.comments.url} className={classes.underline}>
              <Typography variant="h6">{data.comments.title}</Typography>
            </Link>
            <Typography variant="subtitle2" style={{ color: "#a6a6a6" }}>
              {data.comments.score} points | by {data.comments.by}
            </Typography>
            {data.comments.text && (
              <Typography variant="subtitle2">
                <div
                  dangerouslySetInnerHTML={{ __html: data.comments.text }}
                  style={{ color: "#a3add4", textDecoration: "none" }}
                />
              </Typography>
            )}
          </Grid>
        )}

        <Grid className={classes.comments}>
          {data.comments && data.comments.comments && (
            <Fragment>
              <Grid className={classes.commentsNum}>
                <Typography
                  variant="subtitle1"
                  align="left"
                  style={{ color: "#dedede" }}
                >
                  {data.comments.comments.length} comments{" "}
                </Typography>
              </Grid>
              <Divider variant="middle" />
            </Fragment>
          )}
          {data.comments &&
            data.comments.comments &&
            data.comments.comments.map((comment) => (
              <Fragment>
                <CommentTile
                  text={comment.text}
                  user={comment.user}
                  id={comment.id}
                />
              </Fragment>
            ))}
          {data.comments.hasMore && (
            <Button // Button that loads more comments when user reaches the bottom of comments
              onClick={() =>
                fetchMore({
                  variables: {
                    after: data.comments.cursor,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                      ...fetchMoreResult,
                      comments: {
                        ...fetchMoreResult.comments,
                        comments: [
                          ...prev.comments.comments,
                          ...fetchMoreResult.comments.comments,
                        ],
                      },
                    };
                  },
                })
              }
            >
              123414353245
            </Button>
          )}
        </Grid>

        <Container>{networkStatus === 3 && <CircularProgress />}</Container>
      </Container>
    </div>
  );
}

export default Commentpage;
