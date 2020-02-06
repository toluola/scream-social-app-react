import React from "react";
import { Router, Redirect } from "@reach/router";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Router
    {...rest}
    render={props =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

export default AuthRoute;
