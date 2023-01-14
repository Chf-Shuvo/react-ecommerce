import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Edit(props) {
  const history = useHistory();
  /** User Input Details */
  const [userDetail, setUserDetail] = useState([]);
  const handleFromInput = (event) => {
    event.persist();
    setUserDetail({
      ...userDetail,
      [event.target.name]: event.target.value,
    });
  };
  /** Submit the form and update the user */
  const submitForm = () => {
    const formData = {
      name: userDetail.name,
      email: userDetail.email,
    };
    axios
      .patch("/admin/user/update/" + props.match.params.id, formData)
      .then((response) => {
        Swal.fire("Success", response.data.message, "success");
        history.push("/admin/users");
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };
  useEffect(() => {
    axios
      .get("admin/user/edit/" + props.match.params.id)
      .then((response) => {
        setUserDetail(response.data.user);
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
        history.push("/admin/user/index");
      });
  }, [props.match.params.id]);
  return (
    <div className="card">
      <div className="card-header">Edit User</div>
      <div className="card-body">
        <form id="updateUserFrom">
          <div className="row">
            <div className="col">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleFromInput}
                value={userDetail.name || ""}
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
                value={userDetail.email || ""}
                required
              />
            </div>
          </div>
        </form>
      </div>
      <div className="card-footer">
        <button
          type="button"
          className="btn btn-primary float-end"
          onClick={submitForm}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default Edit;
