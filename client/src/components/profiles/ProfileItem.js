import React, { useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAvatarUrl } from "../../actions/profile.action";

const ProfileItem = ({
  profile: {
    _id: prof_id,
    user: { _id, name },
    status,
    company,
    location,
    skills,
    avatarUrl,
  },
  dispatch,
}) => {
  useEffect(() => {
    dispatch(getAvatarUrl(prof_id));
  }, [dispatch]);
  return (
    <div className="col-sm-12 col-md-6 col-lg-4 my-2">
      <Card className="profile-card">
        <div className="pt-4 row justify-content-center">
          <Card.Img
            variant="top"
            src={avatarUrl}
            className="rounded-circle col-7"
          />
        </div>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <div className="card-subtitle text-muted">{company}</div>
          <Card.Text>{status}</Card.Text>
        </Card.Body>
        <div className="px-3">
          {skills.slice(0, 4).map((skill, index) => (
            <span className="my-2 py-2 badge badge-pill badge-info" key={index}>
              <i className="fas fa-check" /> {skill}
            </span>
          ))}
        </div>
        <Card.Body>
          <Link className="btn btn-outline-info" to={`/profile/${_id}`}>
            view profile
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default connect()(ProfileItem);
