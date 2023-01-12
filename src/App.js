import "./assets/backend/css/styles.css";
import "./assets/backend/js/scripts";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Login from "./views/backend/auth/Login";
import Master from "./layouts/backend/Master.js";
import React from "react";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login}></Route>
        <Route path="/admin/dashboard" component={Master}></Route>
      </Switch>
    </Router>
  );
}

export default App;
