import '@babel/polyfill';
import axios from 'axios';
import dotenv from 'dotenv';

import { PASSWORD_RESET, RESET_SUCCESS, RESET_FAILURE } from '../actionTypes';

dotenv.config();

const { APP_URL_BACKEND } = process.env;

export const resettingPassword = submitresetPswd => async (dispatch) => {
  try {
    dispatch({ type: PASSWORD_RESET, payload: submitresetPswd });
    const { data } = await axios.put(`${APP_URL_BACKEND}/api/password`, {
      ...submitresetPswd,
    });
    dispatch({ type: RESET_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: RESET_FAILURE, payload: error.response.data.error });
  }
};
