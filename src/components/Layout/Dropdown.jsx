/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/actionCreators/login';
import { opt } from '../../redux/actions/actionCreators/profile';
import '../../assets/css/dropdown.css';

export class Dropdown extends Component {
  state = {
    displayMenu: false,
  };

  toggleCheck = React.createRef();

  showDropdownMenu = (event) => {
    event.preventDefault();
    setTimeout(() => {
      this.toggleCheck.current.checked = JSON.parse(localStorage.getItem('opted'));
    }, 1);
    this.setState({ displayMenu: true });
  }

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  handleCheck = () => {
    this.props.opt();
  }

  render() {
    return (
      <div className="menu-dropdown" style={{ width: '100px' }}>
        <div className="user-caret" onClick={this.showDropdownMenu} onKeyDown={this.handleClick}>
          <span className="fa fa-caret-down" />
        </div>

        { this.state.displayMenu ? (
          <ul onMouseLeave={this.hideDropdownMenu}>
            <li>
              <Link to="/profile">
                <i className="fa fa-user"></i>
                {' '}
                Profile
              </Link>
            </li>
            <li>
              <Link to="/bookmarks">
                <i className="fa fa-bookmark" aria-hidden="true"></i>
                {' '}
                Bookmarks
              </Link>
            </li>
            <li>
              <Link to="/article">
                <i className="fa fa-plus"></i>
                {' '}
                Create Article
              </Link>
            </li>
            <li>
              <Link to="/reading">
                <i className="fa fa-bar-chart"></i>
                {' '}
                Stats
              </Link>
            </li>
            <li className="optInOut">
              <i className="fa fa-bell"></i>
              {' '}
              <span className="notificationOnOff">Notifications</span>
              {' '}
              <input className="inputCheck" type="checkbox" ref={this.toggleCheck} id="switch" onChange={this.handleCheck} />
              <label className="label" htmlFor="switch"></label>
            </li>
            <hr />
            <li style={{ position: 'relative' }}>
              <button type="button" onClick={this.logout} className="signout">
                <i className="fa fa-sign-out"></i>
                {' '}
              Sign out
              </button>
            </li>
          </ul>
        )
          : (
            null
          )}

      </div>

    );
  }
}

Dropdown.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  login: state.login,
});


export default connect(mapStateToProps, { logout, opt })(Dropdown);
