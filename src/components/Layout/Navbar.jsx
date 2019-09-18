/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown.jsx';

const Navbar = ({ token, username, avatar }) => {
  const changeToSearchPage = (e) => {
    const { value } = e.target;
    if (e.key === 'Enter' && value !== null && value !== undefined && value !== '') {
      window.location = `/search?query=${value}`;
    }
  };
  if (!token || token === undefined) {
    return (
      <nav className="feedNavbar feedLoggedOut" style={{ backgroundColor: '#fffff' }}>
        <div className="firstNavbar">
          <a href="/">
            <img src={require('../../assets/icons/logo.png')} alt="" className="logoNavbar" />
          </a>
          <input
            className="search-bar"
            type="text"
            name="search"
            placeholder="Search ..."
            onKeyPress={changeToSearchPage}
          />
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
        <input
          className="search-bar"
          type="text"
          name="search"
          placeholder="Search ..."
          onKeyPress={changeToSearchPage}
        />
        <div className="userStatus">
          <img src={avatar} alt="" className="avatarFeed" />
          <span id="userStatusName">{username}</span>
          <div style={{ marginLeft: '20px' }}>
            <Dropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
