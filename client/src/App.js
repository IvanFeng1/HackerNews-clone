import React, { Fragment } from "react";
import { Waypoint } from "react-waypoint";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// makeStyles for styling components, CssBaseline because it makes site look nice
// Container for maxwidth
import { makeStyles, Button, CssBaseline, Container } from "@material-ui/core/";

// components
import Homepage from "./components/Homepage.js";
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

function App() {
  return <Homepage />;
}

export default App;
