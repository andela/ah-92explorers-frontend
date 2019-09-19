import axios from 'axios';
import dotenv from 'dotenv';
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_FAILURE, ARTICLE_READ } from '../actionTypes';

dotenv.config();

const { APP_URL_BACKEND } = process.env;

const successFetch = (notifications) => ({
  type: GET_NOTIFICATIONS,
  notifications,
});

const successRead = (notifications) => ({
  type: ARTICLE_READ,
  notifications,
});

const failureFetch = (error) => ({
  type: GET_NOTIFICATIONS_FAILURE,
  error,
});

export const getNotifications = () => async (dispatch) => {
  try {
    const notifications = await axios.get(`${APP_URL_BACKEND}/api/notifications`, { headers: { Authorization: localStorage.getItem('jwtToken') } });
    dispatch(successFetch(notifications.data));
  } catch (error) {
    dispatch(failureFetch('something went wrong'));
  }
};

export const readNotification = (id) => async (dispatch) => {
  try {
    const notifications = await axios.get(`${APP_URL_BACKEND}/api/notifications/${id}`, { headers: { Authorization: localStorage.getItem('jwtToken') } });
    dispatch(successRead(notifications.data));
  } catch (error) {
    dispatch(failureFetch('something went wrong'));
  }
};
