import moxios from 'moxios';
import dotenv from 'dotenv';
import store from '../../__mocks__/store';
import { followOther } from '../../redux/actions/actionCreators/follow';
import {USER_FOLLOW, FOLLOW_SUCCESS, UNFOLLOW_SUCCESS, FOLLOW_FAILURE } from '../../redux/actions/actionTypes';

dotenv.config();

describe('follow action', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should get current user follow', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: { message: 'successful follow isaiah' },
      });
      request.respondWith({
        status: 200,
        response: { message: 'successful unfollow isaiah' },
      });
    });

    return store.dispatch(followOther()).then(() => {
      expect(store.getActions().length).toBe(2);
      expect(store.getActions()).toEqual([
        {
          payload: undefined,
          type: USER_FOLLOW,
        },
        {
          type: FOLLOW_SUCCESS,
          payload: 'successful follow isaiah'
        },
      ]);
    });
  });

  it('should not get user to follow', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: { message: 'successful unfollow isaiah' },
      });
    });
    return store.dispatch(followOther()).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });
});
