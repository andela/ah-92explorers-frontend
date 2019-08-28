import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown.jsx';


const AuthNavbar = () => (
  <nav>
    <div className="firstNavbar">
      <button className="createArt" type="button">
        <Link to="./createArticle.html">
          <img src={require('../../assets/icons/edit.svg')} alt="" className="articleBtn" />
            Write Article
        </Link>
      </button>
      <img src={require('../../assets/icons/logo.png')} alt="" className="logo" />
      <input className="search-bar" type="text" name="search" placeholder="Title, author, tag, keyword ..." />
      <div>
        <img src={require('../../assets/icons/notification.svg')} alt="" className="navIcons notifications disappear" />
        <span className="notif-count">6</span>
      </div>
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
      <img src={require('../../assets/icons/man.svg')} alt="" className="manIcon" />
      <Dropdown />
    </div>
  </nav>
);

export default AuthNavbar;
