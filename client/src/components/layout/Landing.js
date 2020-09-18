import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ dispatch, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Facebook for Developers</h1>
          <p className="lead text-light">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Button
              href="/register"
              className="w-50"
              size="lg"
              variant="outline-success"
            >
              Sign Up
            </Button>
            <Button
              href="/login"
              className="w-50"
              size="lg"
              variant="outline-primary"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps)(Landing);
