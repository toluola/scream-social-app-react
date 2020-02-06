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

const LoginPage = ({ classes }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      setLoading(() => true);
      const loginResult = await axios.post("/login", formData);
      localStorage.setItem("screamToken", `Bearer ${loginResult.data.token}`);
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
          Login
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
            Login
            {loading && (
              <CircularProgress className={classes.progress} size={20} />
            )}
          </Button>
          <br />
          <small className={classes.small}>
            don't have an account ? sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginPage);
