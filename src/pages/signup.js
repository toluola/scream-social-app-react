import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "@reach/router";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppIcon from "../assets/icon.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { navigate } from "@reach/router";

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

const SignupPage = ({ classes }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: ""
  });
  const { email, password, confirmPassword, handle } = formData;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      setLoading(() => true);
      const signupResult = await axios.post("/signup", formData);
      localStorage.setItem("screamToken", `Bearer ${signupResult.data.token}`);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setErrors(err.response.data);
    }
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
            helperText={errors.email}
            error={errors.email ? true : false}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
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
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
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
            helperText={errors.handle}
            error={errors.handle ? true : false}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
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

SignupPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignupPage);
