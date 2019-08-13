import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dotenv from 'dotenv';
import logo from '../../assets/icons/logo.png';
import search from '../../assets/icons/search.svg';
import notification from '../../assets/icons/notification.svg';
import Dropdown from './Dropdown.jsx';

dotenv.config();

class Navbar extends Component {
  render() {
    const { profile } = this.props;
    return (
      <Fragment>
        <div className="navbar">
          <a href="/"><img src={logo} alt="" className="logo dash-logo" /></a>
          <ul>
            <li><Link to="/article">Create Article</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
          <div className="restOfNav">
            <img src={search} alt="" className="navIcons navIconColor" />
            <img src={notification} alt="" className="navIcons navIconColor" />
            <img src={(profile && profile.image) || process.env.DEFAULT_IMAGE} alt="" className="navIcons manIcon" />
            <Dropdown />
          </div>
        </div>

      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile.profile,
  };
}


export default connect(mapStateToProps)(Navbar);
