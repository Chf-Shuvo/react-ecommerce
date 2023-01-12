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
      <Link className="navbar-brand ps-3" to="index.html">
        Title of the APP
      </Link>

      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        to="#!"
      >
        <i className="fas fa-bars"></i>
      </button>

      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button
            className="btn btn-primary"
            id="btnNavbarSearch"
            type="button"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>

      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
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
              <Link
                className="dropdown-item"
                onClick={logoutUser}
                to="javascript:void(0)"
              >
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
