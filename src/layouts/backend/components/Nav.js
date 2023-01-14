import { Link, useHistory } from "react-router-dom";

import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

function Nav() {
  const history = useHistory();
  const logoutUser = (event) => {
    event.preventDefault();
    axios.get("/admin/logout").then((response) => {
      if (response.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("username");
        Swal.fire({
          title: "Logged Out",
          text: "User has been logged out successfully.",
          icon: "success",
        });
        history.push("/");
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.error,
          icon: "error",
        });
      }
    });
  };
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <Link className="navbar-brand ps-3" to="/admin/dashboard">
        Title of the APP
      </Link>

      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        to="#!"
      >
        <i className="fas fa-bars"></i>
      </button>

      <ul className="navbar-nav d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            to="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link className="dropdown-item" to="/admin/profile">
                Profile Settings
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#!">
                Activity Log
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" onClick={logoutUser} to="">
                Logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
