import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile.action";
import { Link, withRouter } from "react-router-dom";

const AddEducation = ({ dispatch, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const {
    school,
    fieldofstudy,
    degree,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addEducation(formData, history));
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="school">
          <Form.Control
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="degree">
          <Form.Control
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="fieldofstudy">
          <Form.Control
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId="fromDate">
          <h4>From Date</h4>
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
            label="Current School or Bootcamp"
            onChange={(e) => {
              onChange(e);
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
        <Form.Group className="form-group">
          <Form.Control
            as="textarea"
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
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

AddEducation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(connect(null)(AddEducation));
