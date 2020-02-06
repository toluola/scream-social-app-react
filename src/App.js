import React from "react";
import { Router } from "@reach/router";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import { HomePage } from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import AuthRoute from "./utils/AuthRoute";
import { NavBar } from "./components/NavBar";
import themeObject from "./utils/themes";
import "./App.css";

const theme = createMuiTheme(themeObject);

let authenticated;
const token = localStorage.screamToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <React.Fragment>
        <div className="container">
          <NavBar />
          <Router>
            <HomePage path="/" />
            <AuthRoute
              path="/login"
              component={LoginPage}
              authenticated={authenticated}
            />
            <AuthRoute
              path="/signup"
              component={SignupPage}
              authenticated={authenticated}
            />
          </Router>
        </div>
      </React.Fragment>
    </MuiThemeProvider>
  );
}

export default App;
