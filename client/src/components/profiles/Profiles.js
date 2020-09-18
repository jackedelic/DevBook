import React, { Fragment, useEffect } from "react";
import { CardGroup } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profile.action";
import ProfileItem from "./ProfileItem";

const Profiles = ({ dispatch, profile: { profiles, loading } }) => {
  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="display-4">Developers</h1>
          <h4 className="text-secondary">
            <i className="fas fa-users"></i> Browse and connect with developers
          </h4>
          <CardGroup className="profiles container mt-5">
            {profiles.length > 0 &&
              profiles.map((profile) =>
                profile.user ? (
                  <ProfileItem key={profile._id} profile={profile} />
                ) : null
              )}
          </CardGroup>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps)(Profiles);
