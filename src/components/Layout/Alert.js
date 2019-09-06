/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const Alert = ({ alerts }) => (
  alerts !== undefined
    && alerts !== null
    && alerts.length > 0
    && alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
);

Alert.propTypes = {
  alerts: PropTypes.array,
};

const mapStateToProps = state => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
