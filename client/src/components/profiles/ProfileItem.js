import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  // replace avatar from url received from GCF (need delay for thispersondoesnotexist.com to change img)
  // Actually is to fulfill CS3219 Task B3 criteria of deploying to a serverless service.
  const getAvatarUrl = async () => {
    try {
      const res = await axios.get(
        "https://asia-southeast2-devbook-cs3219.cloudfunctions.net/getAvatarUrl"
      );
      return res.data.url;
    } catch (e) {
      console.log(`Error while calling getAvatarUrl(): `);
      console.error(e);
      // default to this url
      return "https://thispersondoesnotexist.com/image/" + name;
    }
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-4 my-2">
      <Card className="profile-card">
        <div className="pt-4 row justify-content-center">
          <Card.Img
            variant="top"
            src={getAvatarUrl()}
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

export default ProfileItem;
