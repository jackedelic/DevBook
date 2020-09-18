import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-outline-primary">
        <i className="fas fa-user-circle"></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-outline-success">
        <i className="fas fa-briefcase"></i> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-outline-warning">
        <i className="fas fa-graduation-cap"></i> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
