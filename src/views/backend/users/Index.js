import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function UserIndex() {
  /** User Input Details */
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  /** Users list from the database */
  const [users, setUsers] = useState([]);
  const handleFromInput = (event) => {
    event.persist();
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };
  /** Clear the form after inserting a user */
  const clearForm = () => {
    setUserDetails({
      name: "",
      email: "",
      password: "",
    });
  };
  /** Submit the form and add a user */
  const submitForm = () => {
    const formData = {
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
    };
    axios
      .post("/admin/user/store", formData)
      .then((response) => {
        clearForm();
        setUsers([...users, response.data.user]);
        Swal.fire("Success", response.data.message, "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };
  /** Delete a user */
  const deleteUser = (event, userID) => {
    // if you miss the preventDefault the component will delete all the users cause this function gets executed when the component is mounted
    event.preventDefault();
    axios
      .get("/admin/user/delete/" + userID)
      .then((response) => {
        Swal.fire("Deleted", response.data.message, "success");
        setUsers(users.filter((user) => user.id !== userID));
      })
      .catch((error) => {
        Swal.fire("Error!", error.message, "error");
      });
  };
  // if you want to console log the data then you have to useEffect that cause useEffect executes after the sate has been updated
  useEffect(() => {
    axios
      .get("admin/user/index")
      .then((response) => {
        setUsers(
          response.data.users.filter(
            (user) => user.id !== response.data.current_user
          )
        );
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  }, []);
  return (
    <div>
      <div className="card">
        <div className="card-header">
          All Users{" "}
          <button
            className="btn btn-md btn-primary float-end"
            data-bs-toggle="modal"
            data-bs-target="#modalId"
          >
            <i className="fas fa-user-plus    "></i> add new
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive-lg">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Link
                          to={"/admin/users/edit/" + user.id}
                          className="btn btn-warning btn-sm me-md-2"
                        >
                          <i className="fas fa-edit    "></i>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={(event) => deleteUser(event, user.id)}
                        >
                          <i className="fas fa-trash    "></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* modal */}
      <div
        className="modal fade"
        id="modalId"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                Add New User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="addNewUserFrom">
                <div className="row">
                  <div className="col">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={handleFromInput}
                      value={userDetails.name}
                      required
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="name">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={handleFromInput}
                      value={userDetails.email}
                      required
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="name">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={handleFromInput}
                      value={userDetails.password}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={clearForm}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitForm}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserIndex;
