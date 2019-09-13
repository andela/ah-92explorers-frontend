/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable import/prefer-default-export */
import '@babel/polyfill';
import dotenv from 'dotenv';
import axios from 'axios';
import {
  toast,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  FOLLOWERS_SUCCESS,
  FOLLOWERS_USERS_SUCCESS,
  FOLLOWERS_FAILURE,
  FOLLOWING_FAILURE,
  FOLLOWING_SUCCESS,
  FOLLOWING_USERS_SUCCESS,
  OPTED_IN_OUT,
  OPTED_IN_OUT_FAIL,
  READING_STATS_SUCCESS,
  READING_STATS_TOT,
  READING_STATS_FAILURE,
} from '../actionTypes/profile';
import {
  checkToken,
} from '../../../utils/checkToken';
import {
  setAlert,
} from './alert';
import store from '../../store';
import {
  setCurrentUser,
} from './login';

toast.configure();
dotenv.config();

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const optedInOut = (payload) => ({
  type: OPTED_IN_OUT,
  payload,
});

const optFail = (payload) => ({
  type: OPTED_IN_OUT_FAIL,
  payload,
});

const performAction = (type, payload) => ({
  type,
  payload,
});

export const getCurrentProfile = () => async (dispatch) => {
  checkToken();
  try {
    const uname = store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem('jwtToken'))));
    const {
      username,
    } = uname.user;
    const res = await axios.get(`${process.env.APP_URL_BACKEND}/api/profiles/${username}`);
    dispatch(performAction(GET_PROFILE, res.data));
  } catch (error) {
    dispatch(performAction(PROFILE_ERROR, error.response));
  }
};

export const updateProfile = (profileData, history) => async (dispatch) => {
  checkToken();
  try {
    const formData = new FormData();
    const keys = Object.keys(profileData);
    const values = Object.values(profileData);
    keys.map((name, index) => {
      formData.append(`${name}`, values[index]);
    });

    const res = await axios.patch(`${process.env.APP_URL_BACKEND}/api/profiles`, formData, config);
    localStorage.setItem('image', res.data.profile.image);
    dispatch(performAction(UPDATE_PROFILE_SUCCESS, res.data));
    dispatch(setAlert('Profile successfully updated.', 'success'));
    history.push('/profile');
  } catch (error) {
    if (error.response) {
      dispatch(performAction(UPDATE_PROFILE_FAIL, error.response.data));
      dispatch(setAlert(error.response.data.error, 'danger'));
    }
  }
};

export const followers = () => async (dispatch) => {
  checkToken();
  try {
    const res = await axios.get(`${process.env.APP_URL_BACKEND}/api/followers`);
    dispatch(performAction(FOLLOWERS_SUCCESS, res.data.total));
    dispatch(performAction(FOLLOWERS_USERS_SUCCESS, res.data.follower));
  } catch (error) {
    dispatch(performAction(FOLLOWERS_FAILURE, error.response.data.error));
  }
};

export const following = () => async (dispatch) => {
  checkToken();
  try {
    const res = await axios.get(`${process.env.APP_URL_BACKEND}/api/following`);
    dispatch(performAction(FOLLOWING_SUCCESS, res.data.total));
    dispatch(performAction(FOLLOWING_USERS_SUCCESS, res.data.following));
  } catch (error) {
    dispatch(performAction(FOLLOWING_FAILURE, error.response));
  }
};

export const opt = () => async (dispatch) => {
  try {
    const opt = await axios.patch(`${process.env.APP_URL_BACKEND}/api/notifications/subscribe`, { headers: { Authorization: window.localStorage.getItem('jwtToken') } });
    window.localStorage.setItem('opted', opt.data.opted);
    return dispatch(optedInOut(opt.data));
  } catch (error) {
    dispatch(optFail('something went wrong'));
  }
};

export const readingStats = () => async (dispatch) => {
  checkToken();
  try {
    const { data } = await axios.get(`${process.env.APP_URL_BACKEND}/api/users/reading-stats`);
    dispatch(performAction(READING_STATS_TOT, data.totalArticlesRead));
    dispatch(performAction(READING_STATS_SUCCESS, data.articlesRead));
  } catch (error) {
    dispatch(performAction(READING_STATS_FAILURE, error.response));
  }
};
