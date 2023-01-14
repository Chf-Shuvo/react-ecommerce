import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import axios from "axios";

function UserIndex() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  const handleFromInput = (event) => {
    event.persist();
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };
  const clearForm = () => {
    setUserDetails({
      name: "",
      email: "",
      password: "",
    });
  };
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
        console.log(response.data.user);
        setUsers([...users, response.data.user]);
        Swal.fire("Success", response.data.message, "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };
  // if you want to console log the data then you have to useEffect that cause useEffect executes after the sate has been updated
  useEffect(() => {
    axios
      .get("admin/user/index")
      .then((response) => {
        setUsers(response.data.users);
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
                      <td>[edit],[delete]</td>
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
