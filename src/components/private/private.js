import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const Private = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (localStorage.getItem('user')
      ? (<Component {...props} />)
      : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      ))}
  />
);

export default Private;
