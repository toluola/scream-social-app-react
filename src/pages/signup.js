import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppIcon from "../assets/icon.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { signupUser } from "../redux/actions/userActions";

const styles = {
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto"
  },
  title: {
    margin: "10px auto 10px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative",
    marginBottom: 20
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  }
};

const SignupPage = ({
  classes,
  history,
  signupUser,
  UI: { loading, errors }
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: ""
  });
  useEffect(() => {
    setError(errors);
  }, [errors]);

  const { email, password, confirmPassword, handle } = formData;
  const [error, setError] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();
    signupUser(formData, history);
  };

  const handleChange = event => {
    event.persist();
    setFormData(() => ({
      ...formData,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="icon" width="60px" className={classes.image} />
        <Typography variant="h2" className={classes.title}>
          Sign up
        </Typography>
        <form no-validate="true" onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="email"
            className={classes.textField}
            value={email}
            helperText={error.email}
            error={error.email ? true : false}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="password"
            className={classes.textField}
            helperText={error.password}
            error={error.password ? true : false}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="confirm password"
            className={classes.textField}
            value={confirmPassword}
            helperText={error.confirmPassword}
            error={error.confirmPassword ? true : false}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="handle"
            className={classes.textField}
            value={handle}
            helperText={error.handle}
            error={error.handle ? true : false}
            onChange={handleChange}
            fullWidth
          />
          {error.general && (
            <Typography variant="body2" className={classes.customError}>
              {error.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Sign up
            {loading && (
              <CircularProgress className={classes.progress} size={20} />
            )}
          </Button>
          <br />
          <small className={classes.small}>
            already have an account ? log in <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

SignupPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { signupUser }
)(withStyles(styles)(SignupPage));
