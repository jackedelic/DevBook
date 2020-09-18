import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth.action";

const Login = ({ dispatch, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="">Sign In</h1>
      <p className="text-secondary">
        <i className="fas fa-user"></i> Sign Into your Devbook account
      </p>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Control
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>
      <p className="my-1">
        Don't have an account <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps)(Login);
