import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_FAILURE, ARTICLE_READ } from '../actions/actionTypes';

export const notifications = (state = {}, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        fetchedNotif: true,
        notifications: action.notifications,
      };
    case GET_NOTIFICATIONS_FAILURE:
      return {
        fetchedNotif: false,
        error: action.error,
      };
    case ARTICLE_READ:
      return {
        read: true,
        notifications: action.notifications,
      };
    default:
      return state;
  }
};
