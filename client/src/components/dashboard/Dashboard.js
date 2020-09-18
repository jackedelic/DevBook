import React, { useEffect, Fragment } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile.action";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  dispatch,
  profile: { profile, loading },
  auth: { isAuthenticated, user },
}) => {
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <Button variant="danger" onClick={() => dispatch(deleteAccount())}>
            <i className="fas fa-user-minus"></i>Delete My Account
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
          <Button variant="danger" onClick={() => dispatch(deleteAccount())}>
            <i className="fas fa-user-minus"></i>Delete My Account
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

export default connect(mapStateToProps)(Dashboard);
