import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";

export const NavBar = () => {
  return (
    <AppBar>
      <ToolBar className="nav-container">
        <Link to="/">
          <Button variant="text">Home</Button>
        </Link>
        <Link to="/login">
          <Button variant="text">Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant="text">Signup</Button>
        </Link>
      </ToolBar>
    </AppBar>
  );
};
