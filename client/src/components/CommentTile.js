import React, { Fragment } from "react";
import { makeStyles, Typography, Divider, Grid } from "@material-ui/core";
import Subcomments from "./Subcomments.js";

const useStyles = makeStyles({
  comments: {
    minWidth: 200,
    padding: "1em",
  },
});

function CommentTile({ text, user, id, marginAmount }) {
  const classes = useStyles();
  text = text.replace("a href", 'a  style="color: #dedede" href');
  const itemID = id;
  const marginString = marginAmount.toString() + "em";
  return (
    <Fragment>
      <Grid
        className={classes.comments}
        style={{ margin: `0em 1em 0em ${marginString}` }}
      >
        <Typography variant="subtitle2" style={{ color: "#a6a6a6" }}>
          {user}
        </Typography>
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          style={{ color: "#dedede", textDecoration: "none" }}
        />
      </Grid>
      <Divider variant="middle" />
      <Subcomments id={itemID} currentMargin={marginAmount} />
    </Fragment>
  );
}

export default CommentTile;
