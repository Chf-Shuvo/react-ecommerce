import Footer from "./components/Footer.js";
import Nav from "./components/Nav.js";
import React from "react";
import Sidebar from "./components/Sidebar.js";
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
          <main>Contents will be here</main>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default Master;
