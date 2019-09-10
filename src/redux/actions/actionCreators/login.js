/* istanbul ignore file */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import dotenv from 'dotenv';
import setAuthorizationToken from '../../../utils/setAuthToken';
import {
  SET_CURRENT_USER, SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR,
} from '../actionTypes/login';

dotenv.config();
const baseURL = process.env.APP_URL_BACKEND;


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending,
  };
}

export function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess,
  };
}

export function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError,
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    window.history.pushState({ title: 'Authors Haven' }, 'Authors Haven', '/');
    window.location.reload(true);
  };
}

export function login(email, password) {
  const data = {
    email,
    password,
  };
  let authenticated = false;
  return (dispatch) => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    axios.post(`${baseURL}/api/users/login`, data)
      .then((res) => {
        const { token, username, image } = res.data.user;
        if (token && token.email) authenticated = true;
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('authenticated', authenticated);
        localStorage.setItem('username', username);
        localStorage.setItem('image', image === undefined || image === null ? process.env.DEFAULT_IMAGE : image);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
        dispatch(setLoginSuccess(true));
        dispatch(setLoginPending(false));
      })
      .catch((error) => {
        let errorMessage = null;
        if (error.response) {
          errorMessage = error.response.data.error;
        } else {
          errorMessage = 'Something went wrong. Check your internet connection.';
        }
        dispatch(setLoginError(errorMessage));
        dispatch(setLoginPending(false));
      });
  };
}
