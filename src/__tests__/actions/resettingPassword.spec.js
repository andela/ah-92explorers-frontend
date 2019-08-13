import moxios from 'moxios';
import dotenv from 'dotenv';
import http from '../../utils/axios';
import store from '../../__mocks__/store';
import * as resettingPassword from '../../redux/actions/actionCreators/resettingPassword';
import {
  PASSWORD_RESET,
  RESET_SUCCESS,
  RESET_FAILURE,
} from '../../redux/actions/actionTypes';

dotenv.config();
const { APP_URL_BACKEND } = process.env;

describe('Reset Password actions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install(http);
  });
  afterEach(() => {
    moxios.uninstall(http);
  });

  test('should return signed up successfully', async () => {
    moxios.stubRequest(`${APP_URL_BACKEND}/api/password`, {
      status: 200,
      response: { message: 'Your password was reset successfully' },
    });

    const newPassword = {
      password: 'Password@123',
      token: 'ghjklvhbjkljhvjbkl;jhbvjkl;jhgvjklhgjkjhgvchjkhgvch',
    };
    await store.dispatch(resettingPassword.resettingPassword(newPassword));
    expect(store.getActions()).toEqual([
      {
        type: PASSWORD_RESET,
        payload: newPassword,
      },
      {
        type: RESET_SUCCESS,
        payload: 'Your password was reset successfully',
      },
    ]);
  });

  test('should return signed up successfully', async () => {
    moxios.stubRequest(`${APP_URL_BACKEND}/api/password`, {
      status: 404,
      response: { error: 'Invalid' },
    });

    const newPassword = {
      email: 'Password@123',
    };
    await store.dispatch(resettingPassword.resettingPassword(newPassword));
    expect(store.getActions()).toEqual([
      {
        type: PASSWORD_RESET,
        payload: newPassword,
      },
      {
        type: RESET_FAILURE,
        payload: 'Invalid',
      },
    ]);
  });
});
