import '@babel/polyfill';
import axios from 'axios';
import dotenv from 'dotenv';

import { SUBMITTING_CREDENTIALS, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../actionTypes';

dotenv.config();

const baseURL = process.env.APP_URL_BACKEND;

export const signUp = signupData => async (dispatch) => {
  try {
    dispatch({ type: SUBMITTING_CREDENTIALS, payload: signupData });
    const { data } = await axios.post(`${baseURL}/api/users`, {
      ...signupData,
    });
    dispatch({ type: SIGN_UP_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: SIGN_UP_FAILURE, payload: error.response.data.error });
  }
};
