import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import PostScream from "./PostScream";
import MyButton from "../utils/MyButton";
import Notifications from "./Notifications";
import { connect } from "react-redux";

const NavBar = ({ authenticated }) => {
  return (
    <AppBar>
      <ToolBar className="nav-container">
        {authenticated ? (
          <React.Fragment>
            <PostScream />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <Notifications />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/">
              <Button variant="text">Home</Button>
            </Link>
            <Link to="/login">
              <Button variant="text">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="text">Signup</Button>
            </Link>
          </React.Fragment>
        )}
      </ToolBar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(NavBar);
