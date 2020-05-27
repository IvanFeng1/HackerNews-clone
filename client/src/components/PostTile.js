import React from "react";
import { Card, makeStyles, Link } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "2em",
  },
});
function PostTile({ title, id, user, url }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div>
        <Link href={url}>{title}</Link>
      </div>
    </Card>
  );
}

export default PostTile;
