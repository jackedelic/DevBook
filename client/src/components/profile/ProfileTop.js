import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    user: { name, avatar },
    status,
    company,
    website,
    location,
    social,
  },
}) => {
  return (
    <div className="container m-0">
      <div className="row justify-content-center">
        <img className="round-img col-6" src={avatar} alt="" />
      </div>
      <div className="row justify-content-center">
        <h2 className="">{name}</h2>
      </div>
      <p className="my-0">
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary"
          >
            <i className="fas fa-globe mr-1"></i> {website}
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x"></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
