import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className="profile-about h-100">
      <div className="row">
        <div className="col">
          {bio && (
            <Fragment>
              <h3 className="">{name.trim().split(" ")[0]}'s Bio</h3>
              <p className="my-0">{bio}</p>
            </Fragment>
          )}
        </div>
      </div>
      <div className="line"></div>
      <div className="row">
        <div className="col">
          <h3 className="">Skill Set</h3>
          {skills.map((skill, index) => (
            <div className="p-2 badge badge-pill badge-success" key={index}>
              <i className="fa fa-check"></i> {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
