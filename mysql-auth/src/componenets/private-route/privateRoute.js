import React, { useContext, useEffect } from "react";

import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

import * as api from "../../utils/api";



const PrivateRoute = (props) => {
  const { children, ...otherProps } = props;

  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
      <Route {...otherProps}>{children}</Route>
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        search: new URLSearchParams({
          to: props.location.search
            ? props.location.pathname + props.location.search
            : props.location.pathname,
        }).toString(),
      }}
    />
  );
};

export default PrivateRoute;