import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/icons/logo.png';
import search from '../../assets/icons/search.svg';
import notification from '../../assets/icons/notification.svg';
import manIcon from '../../assets/icons/man.svg';
import Dropdown from './Dropdown.jsx';

class Navbar extends Component {
  render() {
    const { profile } = this.props;
    const img = profile && profile.image === '' ? manIcon : profile && profile.image;
    return (
      <Fragment>
        <div className="navbar">
          <img src={logo} alt="" className="logo dash-logo" />
          <ul>
            <li><a href="./userDashboard.html">Dashboard</a></li>
            <li><a href="./stats.html">Stats</a></li>
            <li><a href="./profile.html">Profile</a></li>
          </ul>
          <div className="restOfNav">
            <img src={search} alt="" className="navIcons navIconColor" />
            <img src={notification} alt="" className="navIcons navIconColor" />
            <img src={img} alt="" className="navIcons manIcon" />
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
