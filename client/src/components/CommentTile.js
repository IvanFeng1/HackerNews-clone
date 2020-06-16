import React, { Fragment } from "react";
import {
  Card,
  makeStyles,
  Typography,
  Divider,
  Grid,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  comments: {
    minWidth: 200,
    padding: "1em",
    margin: "0em 1em 0em 1em",
  },
});

function CommentTile({ text, user, id }) {
  const classes = useStyles();
  text = text.replace("a href", 'a  style="color: #dedede" href');
  return (
    <Fragment>
      <Grid className={classes.comments}>
        <Typography variant="subtitle2" style={{ color: "#a6a6a6" }}>
          {user}
        </Typography>
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          style={{ color: "#dedede", textDecoration: "none" }}
        />
      </Grid>
      <Divider variant="middle" className={classes.divider} />
    </Fragment>
  );
}

export default CommentTile;
