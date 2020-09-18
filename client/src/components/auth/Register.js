import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert.action";
import { register } from "../../actions/auth.action";
import PropTypes from "prop-types";

const Register = ({ dispatch, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match");
      dispatch(setAlert("Passwords do not match", "danger", 3000));
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="">Sign Up</h1>
      <p className="text-secondary">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
          <Form.Text className="text-muted">Your public name</Form.Text>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Control
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <Form.Text className="text-muted">
            We'll never spam your inbox
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps)(Register);
