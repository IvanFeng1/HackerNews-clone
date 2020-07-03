import React from "react";
import { Link as Redirect } from "react-router-dom";
import { Card, makeStyles, Link, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    padding: "1em",
    margin: "1em",
    background: "#43455C",
  },
  title: {
    color: "#a3add4",
    fontSize: 16,
  },
  underline: {
    color: "#a3add4",
  },
  baseURL: {
    fontSize: 12,
  },
  postInfo: {
    color: "#dedede",
  },
  postInfoLinks: {
    textDecoration: "none",
    color: "#dedede",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  noLinkPostInfoLinks: {
    textDecoration: "none",
    color: "#a3add4",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

function PostTile({ title, id, user, url, comments, score, time }) {
  const classes = useStyles();
  var hasUrl;
  if (url === null) {
    hasUrl = false;
  } else {
    hasUrl = true;
    // getting the baseURL
    var noHttpsURL = url.substring(8);
    var slash = noHttpsURL.indexOf("/");
    var baseURL = noHttpsURL.substring(0, slash);
  }

  const currentTime = Math.round(new Date().getTime() / 1000);
  const secDiff = currentTime - time;
  var timeDiff;
  var isMins;
  if (secDiff < 3600) {
    // case that the seconds difference is less than one hour
    timeDiff = Math.floor(secDiff / 60);
    isMins = true;
  } else {
    // case that the seconds difference is greater than or equal to one hour
    timeDiff = Math.floor(secDiff / 3600);
    isMins = false;
  }
  console.log(id);
  return (
    <Card className={classes.root}>
      {hasUrl ? (
        <Box display="flex" flexDirection="row">
          <Box
            display="flex"
            alignItems="center"
            m={1}
            fontWeight="fontWeightBold"
          >
            <Typography style={{ color: "#3BBA9C" }}>{score}</Typography>
          </Box>
          <Box m={1.3}>
            <Link href={url} className={classes.underline}>
              <Typography variant="subtitle1" className={classes.title}>
                {title} <a className={classes.baseURL}>({baseURL})</a>
              </Typography>
            </Link>
            {isMins ? (
              <Typography variant="subtitle2" className={classes.postInfo}>
                by {user} {timeDiff} mintes ago | {"  "}
                <Redirect to={`/item/${id}`} className={classes.postInfoLinks}>
                  {comments} comments
                </Redirect>
              </Typography>
            ) : (
              <Typography variant="subtitle2" className={classes.postInfo}>
                by {user} {timeDiff} hours ago | {"  "}
                <Redirect to={`/item/${id}`} className={classes.postInfoLinks}>
                  {comments} comments
                </Redirect>
              </Typography>
            )}
          </Box>
        </Box>
      ) : (
        <Box display="flex" flexDirection="row">
          <Box
            display="flex"
            alignItems="center"
            m={1}
            fontWeight="fontWeightBold"
          >
            <Typography style={{ color: "#3BBA9C" }}>{score}</Typography>
          </Box>
          <Box m={1.3}>
            <Redirect
              to={`/item/${id}`}
              className={classes.noLinkPostInfoLinks}
            >
              <Typography variant="subtitle1" className={classes.title}>
                {title}
              </Typography>
            </Redirect>
            {isMins ? (
              <Typography variant="subtitle2" className={classes.postInfo}>
                by {user} {timeDiff} mintes ago | {"  "}
                <Redirect to={`/item/${id}`} className={classes.postInfoLinks}>
                  {comments} comments
                </Redirect>
              </Typography>
            ) : (
              <Typography variant="subtitle2" className={classes.postInfo}>
                by {user} {timeDiff} hours ago | {"  "}
                <Redirect to={`/item/${id}`} className={classes.postInfoLinks}>
                  {comments} comments
                </Redirect>
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Card>
  );
}

export default PostTile;
