import { Redirect, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer.js";
import Nav from "./components/Nav.js";
import React from "react";
import Sidebar from "./components/Sidebar.js";
import routes from "../../routes/routes";

const Master = () => {
  return (
    <div className="sb-nav-fixed">
      <Nav></Nav>
      {/* sideabar */}
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar></Sidebar>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <Switch>
              {routes.map((route, index) => {
                return (
                  route.component && (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => <route.component {...props} />}
                    />
                  )
                );
              })}
              <Redirect from="/admin" to="/admin/dashboard"></Redirect>
            </Switch>
          </main>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default Master;
