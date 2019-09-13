/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown.jsx';
import Navbar from './navBar';

const NavBar = ({ token, username, avatar }) => {
  if (!token || token === undefined) {
    return (
      <nav className="feedNavbar feedLoggedOut" style={{ backgroundColor: '#fffff' }}>
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
    <Navbar />
  );
};

export default NavBar;
