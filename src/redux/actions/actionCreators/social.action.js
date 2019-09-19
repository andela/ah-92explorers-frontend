import '@babel/polyfill';
import qs from 'query-string';
import dotenv from 'dotenv';
import crypto from 'crypto';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { socialTypes } from '../actionTypes';

dotenv.config();

const algorithm = 'aes-256-ctr';
const { CRYPTO_PASSWORD } = process.env;

export const success = (user) => ({
  type: socialTypes.LOGIN_SUCCESS,
  user,
});

export const failure = (error) => ({
  type: socialTypes.LOGIN_FAILURE,
  error,
});

export const dec = (token) => {
  const decipher = crypto.createCipher(algorithm, CRYPTO_PASSWORD);
  let decr = decipher.update(token.toString(), 'hex', 'utf8');
  decr += decipher.final('utf8');
  return decr;
};

export const getInfo = (search) => async (dispatch) => {
  const stringObj = qs.parse(search);
  const tokenStr = stringObj && stringObj.token;
  if (!tokenStr) {
    const error = 'something went wrong';
    return dispatch(failure(error));
  }
  try {
    const data = dec(tokenStr);
    const { user, token } = JSON.parse(data);
    const { username } = jwtDecode(token);
    localStorage.setItem('username', username);
    localStorage.setItem('jwtToken', token);
    const getProfile = await axios.get(`${process.env.APP_URL_BACKEND}/api/profiles/${username}`, { headers: { Authorization: token } });
    let userImage;
    if (getProfile && getProfile.data.profile.image !== null) {
      userImage = getProfile.data.profile.image;
    } else {
      userImage = process.env.DEFAULT_IMAGE;
    }
    localStorage.setItem('image', userImage);
    return dispatch(success(user));
  } catch (error) {
    return dispatch(failure('something went wrong'));
  }
};


export const social = (url) => async (dispatch) => {
  try {
    window.location.href = url;
  } catch (error) {
    dispatch(failure(error));
  }
};
