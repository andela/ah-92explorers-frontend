/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Input = ({
  name, value, error, type, placeholder, onChange,
}) => (
  <div className={classnames('form-group', { 'is-invalid': error })}>
    <input
      onChange={onChange}
      value={value}
      type={type}
      name={name}
      className="form-control"
      placeholder={placeholder}
    />
    {error && <span className="text-danger">{error}</span>}
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
};

Input.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  type: 'text',
};

export default Input;
