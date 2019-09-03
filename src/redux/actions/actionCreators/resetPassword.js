import '@babel/polyfill';
import axios from 'axios';
import dotenv from 'dotenv';

import { EMAIL_SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAILURE } from '../actionTypes';

dotenv.config();

const { APP_URL_BACKEND } = process.env;

export const submitEmail = submitAnEmail => async (dispatch) => {
  try {
    dispatch({ type: EMAIL_SUBMIT, payload: submitAnEmail });
    const { data } = await axios.post(`${APP_URL_BACKEND}/api/password`, {
      ...submitAnEmail,
    });
    dispatch({ type: SUBMIT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: SUBMIT_FAILURE, payload: error.response.data.error });
  }
};
