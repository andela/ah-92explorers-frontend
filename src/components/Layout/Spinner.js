import React, { Fragment } from 'react';
import spinner from '../../assets/images/loading.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '70px', margin: 'auto', display: 'block' }}
      alt="loading"
    />
  </Fragment>
);

export default Spinner;
