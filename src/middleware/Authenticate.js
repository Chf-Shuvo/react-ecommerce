import { Redirect, Route, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import Master from "../layouts/backend/Master";
import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

function Authenticate({ ...rest }) {
  const history = useHistory();
  const [Authenticated, setAuthenticated] = useState(false);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    axios.get("/admin/checkAuthentication").then((response) => {
      if (response.status === 200) {
        setAuthenticated(true);
      }
      setloading(false);
    });

    return () => {
      setAuthenticated(false);
    };
  }, []);
  axios.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(error) {
      if (error.response.status === 401) {
        Swal.fire({
          title: "Please login first",
          text: error.response.data.message,
          icon: "error",
        });
        history.push("/");
      }
      return Promise.reject(error);
    }
  );
  if (loading) {
    return <h1>Put the loading screen here.......</h1>;
  } else {
    return (
      <Route
        {...rest}
        render={(props, location) =>
          Authenticated ? (
            <Master {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: location } }} />
          )
        }
      ></Route>
    );
  }
}

export default Authenticate;
