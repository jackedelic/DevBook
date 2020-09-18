import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, to, description },
}) => {
  console.log(`school: ${school}`);
  return (
    <Fragment>
      <h4 className="text-dark">{school}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {to === null ? " Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field of Study: </strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </Fragment>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
