import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

// different pages for the site
import Homepage from "./pages/Homepage.js";
import Commentpage from "./pages/Commentpage.js";
function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Homepage} />
        <Route path="/items/:id" component={Commentpage} />
      </div>
    </Router>
  );
}

export default App;
