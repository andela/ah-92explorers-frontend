import '@babel/polyfill';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import dotenv from 'dotenv';

import {
  USER_FOLLOW, FOLLOW_SUCCESS, UNFOLLOW_SUCCESS, FOLLOW_FAILURE,
} from '../actionTypes';

dotenv.config();
toast.configure();
const { APP_URL_BACKEND } = process.env;

export const followOther = username => async (dispatch) => {
  try {
    dispatch({ type: USER_FOLLOW, payload: username });
    const data = await axios.post(`${APP_URL_BACKEND}/api/${username}/follow`,
      { headers: { Authorization: localStorage.getItem('jwtToken') } });
    if (data.status === 201) {
      dispatch({ type: FOLLOW_SUCCESS, payload: data.data.message });
      toast.success(data.data.message);
    }
    if (data.status === 200) {
      dispatch({ type: UNFOLLOW_SUCCESS, payload: data.data.message });
      toast.success(data.data.message);
    }
  } catch (error) {
    dispatch({ type: FOLLOW_FAILURE, payload: error });
    toast.error(error.response.data.error);
  }
};
