import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <div className="firstNavbar">
      <img src={require('../../assets/icons/logo.png')} alt="" className="logo" />
      <input className="search-bar" type="text" name="search" placeholder="Title, author, tag, keyword ..." />
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
      <button className="signup" type="button"><Link to="/">Sign Up</Link></button>
      <button className="signin" type="button"><Link to="/login">Sign In</Link></button>
    </div>
    <div className="secondNavbar">
      <ul>
        <li>Popular</li>
        <li>Popular</li>
        <li>Popular</li>
        <li>Popular</li>
        <li>Popular</li>
        <li>Popular</li>
        <li>Popular</li>
        <li>Popular</li>
        <li>Popular</li>
        <li>Popular</li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
