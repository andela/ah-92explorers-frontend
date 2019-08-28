import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.png';

class TopNavbar extends Component {
  render() {
    return (
      <Fragment>
        <div className="navbar">
          <img src={logo} alt="" className="logo dash-logo" />
          <div className="restOfNav">
            <ul>
              <li>
                {' '}
                <Link to="/login">Login</Link>
              </li>
              <li>
                {' '}
                <Link to="/signup">Sign up</Link>
              </li>
            </ul>
          </div>
        </div>

      </Fragment>
    );
  }
}

export default TopNavbar;
