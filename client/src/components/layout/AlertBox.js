import React from "react";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AlertBox = ({ dispatch, alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Alert key={alert.id} variant={alert.alertType}>
      {alert.msg}
    </Alert>
  ));

AlertBox.propTypes = {
  dispatch: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alert,
  };
};
export default connect(mapStateToProps)(AlertBox);
