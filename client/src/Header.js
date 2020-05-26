import React, { Fragment } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    background: "#E3E2DF",
    padding: "2em",
  },
  headerText: {
    color: "black",
  },
});
function Header() {
  const classes = useStyles();
  return (
    <Fragment position="static">
      <Toolbar color="inherit" className={classes.header}>
        <Typography variant="h6" className={classes.headerText}>
          HackerNews Clone
        </Typography>
      </Toolbar>
    </Fragment>
  );
}

export default Header;
