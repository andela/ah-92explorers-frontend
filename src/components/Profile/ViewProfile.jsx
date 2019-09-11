/* eslint-disable react/require-default-props */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../assets/css/profile.css';
import '../../assets/css/styleSignup.css';
import Navbar from '../Layout/navBar';
import Alert from '../Layout/Alert';
import Spinner from '../Spinner/Spinner.jsx';
import cam from '../../assets/images/cam.png';
import {
  getCurrentProfile, opt
} from '../../redux/actions/actionCreators/profile';

export class ViewProfile extends Component {
  componentDidMount() {
    const {
      getCurrentProfile,
    } = this.props;
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      window.location = '/login';
    }
    getCurrentProfile();
  }

  handleCheck = (e) => {
    this.props.opt();
    console.log(e.target.checked);
  }

  render() {
    const {
      loading, profile,
    } = this.props;
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
                <h2>User Profile</h2>
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
                    <div className="articles">
                      <label>20</label>
                      <label>Articles</label>
                    </div>
                    <div className="followers">
                      <label>500</label>
                      <label>Followers</label>
                    </div>
                    <div className="following">
                      <label>400</label>
                      <label>Following</label>
                    </div>
                  </div>
                  <div className="optInOut">
                    <span className="notificationOnOff">Notifications</span>
                    <input className="inputCheck" type="checkbox" id="switch" onChange={this.handleCheck} />
                    <label className="label" htmlFor="switch"></label>
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
      </Fragment>
    );
  }
}

ViewProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile, opt,
  },
)(ViewProfile);
