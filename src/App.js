import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import store from "./redux/store";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
// import jwtDecode from "jwt-decode";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
// import { PrivateRoute } from "./utils/AuthRoute";
import NavBar from "./components/NavBar";
import themeObject from "./utils/themes";
import "./App.css";
// import {
//   getUserData,
//   setAuthorizationHeader
// } from "./redux/actions/userActions";
// import { CLEAR_ERRORS } from "./redux/types";
//
const theme = createMuiTheme(themeObject);
// const token = localStorage.FBIdToken;

// if (token) {
//   jwtDecode(token);
//   setAuthorizationHeader(token);
//   store.dispatch(getUserData);
//   store.dispatch({ type: CLEAR_ERRORS });
//   console.log("got here");
// } else {
//   Redirect("/");
// }
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignupPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
