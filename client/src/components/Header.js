import React, { Fragment } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    padding: "2em",
    borderBottom: "1px solid #3BBA9C",
  },
  headerText: {
    color: "#3BBA9C",
  },
});
function Header() {
  const classes = useStyles();
  return (
    <Fragment>
      <Toolbar color="inherit" className={classes.header}>
        <Typography variant="h6" className={classes.headerText}>
          HackerNews Clone
        </Typography>
      </Toolbar>
    </Fragment>
  );
}

export default Header;
