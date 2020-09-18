import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile.action";
import { withRouter, Link } from "react-router-dom";

const AddExperience = ({ dispatch, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addExperience(formData, history));
  };
  return (
    <Fragment>
      <h1 className="l">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small className="text-muted">* = required field</small>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="job">
          <Form.Control
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="company">
          <Form.Control
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Control
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId="fromDate">
          <Form.Label>From Date</Form.Label>
          <Form.Control
            type="date"
            name="from"
            value={from}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId="current">
          <Form.Check
            type="checkbox"
            name="current"
            value={current}
            label="Current Job"
            checked={current}
            onChange={(e) => {
              setFormData({ ...formData, current: !current });
              toggleDisabled(!toDateDisabled);
            }}
          />{" "}
        </Form.Group>
        <Form.Group controlId="toDate">
          <Form.Label>To Date</Form.Label>
          <Form.Control
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Control
            as="textarea"
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={onChange}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Submit</Button>
        <Link className="btn btn-secondary my-1" to="/dashboard">
          Go Back
        </Link>
      </Form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(connect(null)(AddExperience));
