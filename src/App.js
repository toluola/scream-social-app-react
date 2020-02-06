import React from "react";
import { Router } from "@reach/router";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";
import { NavBar } from "./components/NavBar";
import themeObject from "./utils/themes";
import "./App.css";

const theme = createMuiTheme(themeObject);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <React.Fragment>
        <div className="container">
          <NavBar />
          <Router>
            <HomePage path="/" />
            <LoginPage path="/login" />
            <SignupPage path="/signup" />
          </Router>
        </div>
      </React.Fragment>
    </MuiThemeProvider>
  );
}

export default App;
