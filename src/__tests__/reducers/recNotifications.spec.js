import {
    GET_NOTIFICATIONS, GET_NOTIFICATIONS_FAILURE, ARTICLE_READ
  } from '../../redux/actions/actionTypes';
  import {recvNotifications as notif} from '../../redux/reducers/recvNotifications';
  
  describe('Article Reducer', () => {
    it('should return payload when GET_NOTIFICATIONS types performed', () => {
      const notifications = {
        notifications: {}
      };
      const initialState = {
        notifications: {},
      };
      const state = notif(initialState, {
        type: GET_NOTIFICATIONS,
        notifications,
      });
      expect(state).toEqual(state);
    });
    it('should return error', () => {
      const notifications = {
        error: 'something went wrong'
      };
      const initialState = {
        notifications: {},
      };
      const state = notif(initialState, {
        type: GET_NOTIFICATIONS_FAILURE,
        notifications,
      });
      expect(state).toEqual(state);
    });
    it('should return payload when ARTICLE_READ types performed', () => {
      const notifications = {
        notifications: {}
      };
      const initialState = {
        notifications: {},
      };
      const state = notif(initialState, {
        type: ARTICLE_READ,
        notifications,
      });
      expect(state).toEqual(state);
    });
  });
  