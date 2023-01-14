import "./assets/backend/css/styles.css";
import "./assets/backend/js/scripts";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Authenticate from "./middleware/Authenticate";
import Login from "./views/backend/auth/Login";
import React from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (configuration) {
  const token = localStorage.getItem("auth_token");
  configuration.headers.Authorization = token ? `Bearer ${token}` : "";
  return configuration;
});

function App() {
  return (
    <Router>
      <Switch>
        <Authenticate path="/admin" name="Admin" />
        <Route exact path="/" name="Login" component={Login}></Route>
      </Switch>
    </Router>
  );
}

export default App;
