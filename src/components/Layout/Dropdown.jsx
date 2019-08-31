/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/actionCreators/login';
import '../../assets/css/dropdown.css';

export class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
    };
  }

  showDropdownMenu = (event) => {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
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

  render() {
    const { user } = this.props.login;

    return (
      <div className="menu-dropdown" style={{ width: '100px' }}>
        <div className="user-caret" onClick={this.showDropdownMenu} onKeyDown={this.handleClick}>
          {user.username}
          {' '}
          <span className="fa fa-caret-down" />
        </div>

        { this.state.displayMenu ? (
          <ul>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/">My Articles</Link></li>
            <li><Link to="/">People</Link></li>
            <li><Link to="/">Stats</Link></li>
            <hr />
            <li><button type="button" onClick={this.logout} className="signout">Sign out</button></li>
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

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}


export default connect(mapStateToProps, { logout })(Dropdown);
