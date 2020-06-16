import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    padding: "1.3em",
    borderBottom: "1px solid #3BBA9C",
  },
  headerText: {
    color: "#3BBA9C",
  },
  removeUnderline: {
    textDecoration: "none",
  },
});
function Header() {
  const classes = useStyles();
  return (
    <Fragment>
      <Toolbar color="inherit" className={classes.header}>
        <Link exact to="/" className={classes.removeUnderline}>
          <Typography variant="h6" className={classes.headerText}>
            HackerNews Clone
          </Typography>
        </Link>
      </Toolbar>
    </Fragment>
  );
}

export default Header;
