import '@babel/polyfill';
import qs from 'query-string';
import dotenv from 'dotenv';
import crypto from 'crypto';
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

export const getInfo = (search) => (dispatch) => {
  const stringObj = qs.parse(search);
  const tokenStr = stringObj && stringObj.token;
  if (!tokenStr) {
    const error = 'something went wrong';
    return dispatch(failure(error));
  }
  try {
    const data = dec(tokenStr);
    const { user, token } = JSON.parse(data);
    localStorage.setItem('jwtToken', token);
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
