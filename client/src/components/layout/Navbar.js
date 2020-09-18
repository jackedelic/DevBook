import React, { Fragment } from "react";
import { Navbar as RBNavbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth.action";

const Navbar = ({ dispatch, auth: { isAuthenticated, loading } }) => {
  const handleLogout = (e) => dispatch(logout());
  const authLinks = (
    <Fragment>
      <RBNavbar.Toggle aria-controls="authlinks" />
      <RBNavbar.Collapse id="authlinks">
        <Nav className="w-100">
          <Link className="nav-link" to="/profiles">
            <i className="fas fa-user-astronaut mx-1 sqr-20"></i>
            Developers
          </Link>
          <Link className="nav-link" to="/posts">
            <i className="fas fa-scroll mx-1 sqr-20"></i>
            Posts
          </Link>
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-user mx-1 sqr-20"></i>
            Dashboard
          </Link>
          <Button variant="info" onClick={handleLogout} className="ml-auto">
            <i className="fas fa-user mx-1 sqr-20"></i>
            Logout
          </Button>
        </Nav>
      </RBNavbar.Collapse>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <RBNavbar.Toggle aria-controls="guestlinks" />
      <RBNavbar.Collapse id="guestlinks">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/profiles">
            Developers
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </Nav>
      </RBNavbar.Collapse>
    </Fragment>
  );
  return (
    <RBNavbar bg="dark" expand="md" fixed="top" variant="dark">
      <RBNavbar.Brand href="/">
        <i className="fas fa-code"></i> DevBook
      </RBNavbar.Brand>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </RBNavbar>
  );
};

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Navbar);
