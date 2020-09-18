import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Button, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile.action";

const CreateProfile = ({ dispatch, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    bio: "",
    status: "",
    githubusername: "",
    skills: "",
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = formData;

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData, history));
  };
  return (
    <Fragment>
      <h1 className="">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId="status">
          <Form.Control
            as="select"
            name="status"
            value={status}
            onChange={(e) => onChange(e)}
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </Form.Control>
          <Form.Text className="text-muted">
            Give us an idea of where you are at in your career
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="company">
          <Form.Control
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <Form.Text className="text-muted">
            Could be your own company or one you work for
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="website">
          <Form.Control
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <Form.Text className="text-muted">
            Could be your own or a company website
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Control
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <Form.Text className="text-muted">
            City & state suggested (eg. Boston, MA)
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="skills">
          <Form.Control
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <Form.Text className="text-muted">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="githubusername">
          <Form.Control
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <Form.Text className="text-muted">
            If you want your latest repos and a Github link, include your
            username
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="bio">
          <Form.Control
            as="textarea"
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></Form.Control>
          <Form.Text className="text-muted">
            Tell us a little about yourself
          </Form.Text>
        </Form.Group>

        <div className="my-2">
          <Button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            variant="info"
          >
            Add Social Network Links
          </Button>
          <small className="text-muted">Optional</small>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <Form.Group className="social-input container-fluid my-4">
              <Row>
                <i className="fab fa-twitter fa-2x"></i>
                <Form.Control
                  className="col-4"
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </Row>
            </Form.Group>

            <Form.Group className="social-input container-fluid my-4">
              <Row>
                <i className="fab fa-facebook fa-2x"></i>
                <Form.Control
                  className="col-4"
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </Row>
            </Form.Group>

            <Form.Group className="social-input container-fluid my-4">
              <Row>
                <i className="fab fa-youtube fa-2x"></i>
                <Form.Control
                  className="col-4"
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={(e) => onChange(e)}
                />
              </Row>
            </Form.Group>

            <Form.Group className="social-input container-fluid my-4">
              <Row>
                <i className="fab fa-linkedin fa-2x"></i>
                <Form.Control
                  className="col-4"
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={(e) => onChange(e)}
                />
              </Row>
            </Form.Group>

            <Form.Group className="social-input container-fluid my-4">
              <Row>
                <i className="fab fa-instagram fa-2x"></i>
                <Form.Control
                  className="col-4"
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </Row>
            </Form.Group>
          </Fragment>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-secondary my-1" to="/dashboard">
          Go Back
        </Link>
      </Form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(connect(null)(CreateProfile));
