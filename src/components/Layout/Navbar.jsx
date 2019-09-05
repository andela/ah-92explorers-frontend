/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown.jsx';

const Navbar = ({ token, username, avatar }) => {
  if (!token || token === undefined) {
    return (
      <nav className="feedNavbar" style={{ backgroundColor: '#fffff' }}>
        <div className="firstNavbar">
          <a href="/">
            <img src={require('../../assets/icons/logo.png')} alt="" className="logoNavbar" />
          </a>
          <div className="notifications-drop">
            <ul>
              <li className="title">
            hillary liked your article
                <span>unread</span>
              </li>
              <li className="title">
            hillary liked your article
                <span>unread</span>
              </li>
              <li className="title">
            hillary liked your article
                <span>unread</span>
              </li>
              <li className="title">
            hillary liked your article
                <span>unread</span>
              </li>
              <li className="title">
            hillary liked your article
                <span>unread</span>
              </li>
            </ul>
          </div>
          <button className="signupBtnNav disappear dBtnOne" type="button"><Link to="/signup">Sign Up</Link></button>
          <button className="signinBtnNav disappear" type="button"><Link to="/login">Sign In</Link></button>

        </div>
        <div className="secondNavbar">
          <div className="listBtns disappearBtn">
            <button className="signupBtnNav" type="button"><Link to="/signup">Sign Up</Link></button>
            <button className="signinBtnNav" type="button"><Link to="/login">Sign In</Link></button>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="feedNavbar feedLoggedIn" style={{ backgroundColor: '#fffff' }}>
      <div className="firstNavbar">
        <img src={require('../../assets/icons/logo.png')} alt="" className="logoNavbar" />
        <div className="notifications-drop">
          <ul>
            <li className="title">
            hillary liked your article
              <span>unread</span>
            </li>
            <li className="title">
            hillary liked your article
              <span>unread</span>
            </li>
            <li className="title">
            hillary liked your article
              <span>unread</span>
            </li>
            <li className="title">
            hillary liked your article
              <span>unread</span>
            </li>
            <li className="title">
            hillary liked your article
              <span>unread</span>
            </li>
          </ul>
        </div>
        <div className="userStatus">
          <img src={avatar} alt="" className="avatarFeed" />
          <span id="userStatusName">{username}</span>
          <Dropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
