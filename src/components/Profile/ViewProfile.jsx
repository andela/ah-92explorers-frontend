/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../assets/css/profile.css';
import '../../assets/css/styleSignup.css';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import Navbar from '../Layout/navBar';
import Alert from '../Layout/Alert';
import Spinner from '../Spinner/Spinner.jsx';

import cam from '../../assets/images/cam.png';
import {
  getCurrentProfile, following, followers,
} from '../../redux/actions/actionCreators/profile';
import { followOther } from '../../redux/actions/actionCreators/follow';

export class ViewProfile extends Component {
  state = {
    followerModal: false,
    followingModal: false,
    allFollowing: [],
    allFollowers: [],
  }

  componentDidMount() {
    const {
      getCurrentProfile, following, followers,
    } = this.props;
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      window.location = '/login';
    }
    getCurrentProfile();
    following();
    followers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.thefollowingUsers !== null) {
      this.setState({
        allFollowing: nextProps.thefollowingUsers,
      });
    }
    if (nextProps.thefollowerUsers !== null) {
      this.setState({
        allFollowers: nextProps.thefollowerUsers,
      });
    }
  }

  followerToggle = () => {
    this.setState(prevState => ({
      followerModal: !prevState.followerModal,
    }));
  }

  followingToggle = () => {
    this.setState(prevState => ({
      followingModal: !prevState.followingModal,
    }));
  }

  handleFollowing = (usernameInfo) => {
    this.props.followOther(usernameInfo);
  };

  render() {
    const {
      loading, profile, totalFollowing, totalFollowers, followSuccess, unfollowSuccess,
    } = this.props;

    let splitStringFollow;
    let usernameFollow;
    if (followSuccess) {
      splitStringFollow = followSuccess.split(' ');
      usernameFollow = splitStringFollow[splitStringFollow.length - 1];
    }

    let splitStringUnfollow;
    let usernameUnfollow;
    if (unfollowSuccess) {
      splitStringUnfollow = unfollowSuccess.split(' ');
      usernameUnfollow = splitStringUnfollow[splitStringUnfollow.length - 1];
    }

    const {
      allFollowing, allFollowers,
    } = this.state;

    const allUsersFollowing = allFollowing.map(user => (
      <div key={user.username}>
        <div className="followUser">
          <div className="user-image">
            <div className="followerImage">
              <img className="ImageUrl" src={(user && user.image) || require('../../assets/icons/man.svg')} alt="avatar" />
            </div>
            <Link to={`/user-profile/${user.username}`}><div className="followUsername">{user.username}</div></Link>
          </div>
          <button type="button" id="followUnFollow" className="upBtn followUnF follow flow-btn" onClick={() => this.handleFollowing(user.username)}>
            {followSuccess && usernameFollow === user.username ? ('unfollow') : unfollowSuccess && usernameUnfollow === user.username ? ('follow') : 'unfollow'}
          </button>
        </div>
      </div>
    ));

    const allUsersFollower = allFollowers.map(user => (
      <div key={user.username}>
        <div className="followUser">
          <div className="user-image">
            <div className="followerImage">
              <img className="ImageUrl" src={(user && user.image) || require('../../assets/icons/man.svg')} alt="avatar" />
            </div>
            <Link to={`/user-profile/${user.username}`}><div className="followUsername">{user.username}</div></Link>
          </div>
        </div>
      </div>
    ));

    return (
      <Fragment>
        <Navbar />
        {loading === true && profile === null ? (
          <section className="profile-section">
            <Spinner />
          </section>
        ) : (
          <div id="container">
            <section id="main">
              <div className="widget page-heading">
                <h2>My Profile</h2>
              </div>
              <div className="multi-widget">
                <div className="widget user-profile-s1">
                  <div className="profile-img">
                    <img src={(profile && profile.image) || require('../../assets/icons/man.svg')} alt="avatar" />
                    <div className="change-image">
                      <Link to="/profile/edit">
                        {' '}
                        <img src={cam} alt="" />
                      </Link>
                    </div>
                  </div>
                  <div className="numbers">
                    <div className="followers">
                      <label onMouseOver={this.followerToggle}>{totalFollowers || '0'}</label>
                      <label>Followers</label>
                    </div>
                    <div className="following">
                      <label onMouseOver={this.followingToggle}>{totalFollowing || '0'}</label>
                      <label>Following</label>
                    </div>
                  </div>
                  <div className="social">
                    <h3>
                      Social
                      {' '}
                      <Link to="/profile/edit"><i className="fa fa-pencil" /></Link>
                    </h3>
                    <ul>
                      <li className="facebook">
                        <a href={profile && profile.facebook} target="_blank">
                          <i className="fa fa-facebook" />
                        </a>

                      </li>
                      <li className="twitter"><a href={profile && profile.twitter} target="_blank"><i className="fa fa-twitter" /></a></li>
                      <li className="instagram"><a href={profile && profile.instagram} target="_blank"><i className="fa fa-instagram" /></a></li>
                      <li className="linkedin"><a href={profile && profile.linkedIn} target="_blank"><i className="fa fa-linkedin" /></a></li>
                    </ul>
                  </div>
                </div>
                <div className="widget user-profile-s2">
                  <div className="basic-info">
                    <div className="success-alert">
                      <Alert />
                    </div>
                    <h3>
                      {' '}
                    Personal Info
                      {' '}
                      <Link to="/profile/edit"><i className="fa fa-pencil" /></Link>
                    </h3>
                    <ul>
                      <li>
                        <span>Firstname: </span>
                        {' '}
                        {profile && profile.firstName}
                      </li>
                      <li>
                        <span>Lastname: </span>
                        {' '}
                        {profile && profile.lastName}
                      </li>
                      <li>
                        <span>Username: </span>
                        {' '}
                        {profile && profile.username}
                      </li>
                      <li>
                        <span>Mobile Phone: </span>
                        {' '}
                        {profile && profile.phone}
                      </li>
                      <li>
                        <span>Location: </span>
                        {' '}
                        {profile && profile.location}
                      </li>
                      <li>
                        <span>Bio: </span>
                        {profile && profile.bio}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        <Modal
          isOpen={this.state.followerModal}
          followerToggle={this.followerToggle}
          className={this.props.className}
        >
          <ModalHeader followerToggle={this.followerToggle}>
            My followers
          </ModalHeader>
          <ModalBody>
            {allUsersFollower.length === 0 ? (
              <div> You have no follower</div>
            ) : allUsersFollower }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onMouseOver={this.followerToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.followingModal}
          followerToggle={this.followingToggle}
          className={this.props.className}
        >
          <ModalHeader followerToggle={this.followingToggle}>
            My following
          </ModalHeader>
          <ModalBody>
            {allUsersFollowing.length === 0 ? (
              <div> You have no following</div>
            ) : allUsersFollowing }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onMouseOver={this.followingToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

ViewProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  notifications: state.notifications,
  profile: state.profile.profile,
  loading: state.profile.loading,
  totalFollowers: state.profile.followers,
  thefollowerUsers: state.profile.followerUsers,
  totalFollowing: state.profile.following,
  thefollowingUsers: state.profile.followingUsers,
  followSuccess: state.follow.follow.followSuccess,
  unfollowSuccess: state.follow.follow.unfollowSuccess,
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile, following, followers, followOther,
  },
)(ViewProfile);
