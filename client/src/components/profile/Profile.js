import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getProfileById, getAvatarUrl } from "../../actions/profile.action";
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
          <Link to="/profiles" className="btn btn-secondary">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit
              </Link>
            )}
          <div className="container">
            <div className="row mb-4">
              <div className="col-xs-12 col-md-6">
                <ProfileTop profile={profile} />
              </div>
              <div className="col-xs-12 col-md-6 mt-md-0 mt-4">
                <ProfileAbout profile={profile} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="p-3 border rounded mb-3">
                  {profile.githubusername && (
                    <ProfileGithub username={profile.githubusername} />
                  )}
                </div>
                <div className="p-3 border rounded mb-3">
                  {profile.experience.length > 0 ? (
                    <Fragment>
                      <h3 class="">Experience</h3>
                      {profile.experience.map((exp) => (
                        <Fragment>
                          <div className="line"></div>
                          <ProfileExperience experience={exp} key={exp._id} />
                        </Fragment>
                      ))}
                    </Fragment>
                  ) : (
                    <h4>No experience credentials</h4>
                  )}
                </div>
                <div className="p-3 border rounded mb-3">
                  {profile.education.length > 0 ? (
                    <Fragment>
                      <h3 class="">Education</h3>
                      {profile.education.map((edu) => (
                        <Fragment>
                          <div className="line"></div>
                          <ProfileEducation education={edu} key={edu._id} />
                        </Fragment>
                      ))}
                    </Fragment>
                  ) : (
                    <h4>No education credentials</h4>
                  )}
                </div>
              </div>
            </div>
          </div>
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
