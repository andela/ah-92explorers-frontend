/* eslint-disable array-callback-return */
/* eslint-disable import/prefer-default-export */
import '@babel/polyfill';
import dotenv from 'dotenv';
import axios from 'axios';
import {
  CHECK_FOLLOW,
  VIEW_USER,
  VIEW_USER_ERROR,
} from '../actionTypes/viewUser';
import {
  checkToken,
} from '../../../utils/checkToken';

dotenv.config();

const performAction = (type, payload) => ({
  type,
  payload,
});

export const getProfileUser = () => async (dispatch) => {
  checkToken();
  try {
    const path = window.location.href;
    const directories = path.split('/');
    const username = directories[(directories.length - 1)];
    const { data } = await axios.get(`${process.env.APP_URL_BACKEND}/api/profiles/${username}`);
    const followed = await axios.get(`${process.env.APP_URL_BACKEND}/api/${username}/followed`);
    dispatch(performAction(VIEW_USER, data.profile));
    dispatch(performAction(CHECK_FOLLOW, followed.data.message));
  } catch (error) {
    dispatch(performAction(VIEW_USER_ERROR, error.response));
  }
};
