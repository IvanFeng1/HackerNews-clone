import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

// different pages for the site
import Homepage from "./pages/Homepage.js";
import Commentpage from "./pages/Commentpage.js";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/item/:id" component={Commentpage} />
      </Switch>
    </Router>
  );
}

export default App;
