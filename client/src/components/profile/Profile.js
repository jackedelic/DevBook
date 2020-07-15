import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile.action";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

// Wrapped in Route component
const Profile = ({ dispatch, profile: { profile, loading }, auth, match }) => {
  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [dispatch, match.params.id]);
  return (
    <Fragment>
      {loading || profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit
              </Link>
            )}
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />
          <div className="profile-exp bg-white p-2">
            {profile.experience.length > 0 ? (
              <Fragment>
                <h2 class="text-primary">Experience</h2>
                {profile.experience.map((exp) => (
                  <ProfileExperience experience={exp} key={exp._id} />
                ))}
              </Fragment>
            ) : (
              <h4>No experience credentials</h4>
            )}
          </div>
          <div className="profile-edu bg-white p-2">
            {profile.education.length > 0 ? (
              <Fragment>
                <h2 class="text-primary">Education</h2>
                {profile.education.map((edu) => (
                  <ProfileEducation education={edu} key={edu._id} />
                ))}
              </Fragment>
            ) : (
              <h4>No education credentials</h4>
            )}
          </div>
          {profile.githubusername && (
            <ProfileGithub username={profile.githubusername} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
