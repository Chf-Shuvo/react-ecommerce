import React, { useState } from "react";

import Swal from "sweetalert2";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleInput = (event) => {
    event.persist();
    setLogin({ ...loginInput, [event.target.name]: event.target.value });
  };
  const loginSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/login", data).then((response) => {
        if (response.data.status === 200) {
          localStorage.setItem("auth_token", response.data.token);
          localStorage.setItem("username", response.data.user.name);
          history.push("/admin/dashboard");
        } else if (response.data.status === 401) {
          Swal.fire({
            title: "Invalid email/password!",
            text: "Please check your email/password and try again.",
            icon: "question",
          });
        } else {
          Swal.fire({
            title: "Invalid email/password!",
            text: "Please check your email/password and try again.",
            icon: "error",
          });
        }
      });
    });
  };
  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center login-form-content">
              <div className="col-lg-5">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header bg-secondary">
                    <h3 className="text-center font-weight-light my-4">
                      Login
                    </h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={loginSubmit}>
                      <div className="form-floating mb-3">
                        <input
                          name="email"
                          className="form-control"
                          id="inputEmail"
                          type="email"
                          placeholder="Email"
                          onChange={handleInput}
                          value={loginInput.email}
                        />
                        <label>Email address</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          name="password"
                          className="form-control"
                          id="inputPassword"
                          type="password"
                          placeholder="Password"
                          onChange={handleInput}
                          value={loginInput.password}
                        />
                        <label>Password</label>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                        <a className="small" href="password.html">
                          Forgot Password?
                        </a>
                        <button className="btn btn-primary" type="submit">
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div id="layoutAuthentication_footer">
        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">
                Copyright &copy; Your Website 2022
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Login;
