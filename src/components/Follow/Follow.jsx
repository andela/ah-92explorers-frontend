/* eslint-disable react/require-default-props */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../assets/css/profile.css';
import '../../assets/css/styleSignup.css';
import Navbar from '../Layout/navBar';
import Spinner from '../Spinner/Spinner.jsx';
import Alert from '../Layout/Alert';
import {
  getProfileUser,
} from '../../redux/actions/actionCreators/viewUser';
import { followOther } from '../../redux/actions/actionCreators/follow';

export class Follow extends Component {
  componentDidMount() {
    const {
      getProfileUser,
    } = this.props;
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      window.location = '/login';
    }
    getProfileUser();
  }

  handleFollowing = () => {
    const path = window.location.href;
    const directories = path.split('/');
    const username = directories[(directories.length - 1)];
    this.props.followOther(username);
  };

  render() {
    const {
      loading, viewUser, checkFollower, followSuccess, unfollowSuccess,
    } = this.props;
    return (
      <Fragment>
        <Navbar />
        {loading === true && viewUser === null ? (
          <section className="profile-section">
            <Spinner />
          </section>
        ) : (
          <div id="container">
            <section id="main">
              <div className="widget page-heading">
                <h2>
                  {viewUser.username}
                  {' '}
                's profile
                </h2>
              </div>
              <div className="multi-widget">
                <div className="widget user-profile-s1">
                  <div className="profile-img">
                    <img src={(viewUser.image) || require('../../assets/icons/man.svg')} alt="avatar" />
                  </div>
                  <button type="button" id="followUnFollow" className="upBtn followUnF follow" onClick={this.handleFollowing}>
                    {followSuccess ? ('unfollow') : unfollowSuccess ? ('follow') : checkFollower === 'following' ? ('unfollow') : checkFollower}
                  </button>
                  <div className="social">
                    <h3 className="socialMediaTitle">
                      {viewUser.username}
                      {' '}
                's Social media
                    </h3>
                    <ul>
                      <li className="facebook">
                        <a href={viewUser.facebook} target="_blank">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li className="twitter"><a href={viewUser.twitter} target="_blank"><i className="fa fa-twitter" /></a></li>
                      <li className="instagram"><a href={viewUser.instagram} target="_blank"><i className="fa fa-instagram" /></a></li>
                      <li className="linkedin"><a href={viewUser.linkedIn} target="_blank"><i className="fa fa-linkedin" /></a></li>
                    </ul>
                  </div>
                </div>
                <div className="widget user-profile-s2">
                  <div className="basic-info">
                    <div className="success-alert">
                      <Alert />
                    </div>
                    <h3>
              Profile Info
                    </h3>
                    <ul>
                      <li>
                        <span>Firstname: </span>
                        {viewUser.firstName}
                      </li>
                      <li>
                        <span>Lastname: </span>
                        {viewUser.lastName}
                      </li>
                      <li>
                        <span>Username: </span>
                        {viewUser.username}
                      </li>
                      <li>
                        <span>Mobile Phone: </span>
                        {viewUser.phone}
                      </li>
                      <li>
                        <span>Location: </span>
                        {viewUser.location}
                      </li>
                      <li>
                        <span>Bio: </span>
                        {viewUser.bio}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </Fragment>
    );
  }
}

Follow.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  viewUser: state.viewUser.viewUser,
  checkFollower: state.viewUser.checkFollower,
  followSuccess: state.follow.follow.followSuccess,
  unfollowSuccess: state.follow.follow.unfollowSuccess,
  loading: state.viewUser.loading,
});

export default connect(mapStateToProps, { getProfileUser, followOther })(Follow);
