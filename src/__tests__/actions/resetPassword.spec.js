import moxios from 'moxios';
import dotenv from 'dotenv';
import http from '../../utils/axios';
import store from '../../__mocks__/store';
import * as submitEmail from '../../redux/actions/actionCreators/resetPassword';
import {
  EMAIL_SUBMIT,
  SUBMIT_SUCCESS,
  SUBMIT_FAILURE,
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
      response: { message: 'We have e-mailed a password reset link, Check your email!' },
    });

    const userEmail = {
      email: 'niyoceles@gmail.com',
    };
    await store.dispatch(submitEmail.submitEmail(userEmail));
    expect(store.getActions()).toEqual([
      {
        type: EMAIL_SUBMIT,
        payload: userEmail,
      },
      {
        type: SUBMIT_SUCCESS,
        payload: 'We have e-mailed a password reset link, Check your email!',
      },
    ]);
  });

  test('should return signed up successfully', async () => {
    moxios.stubRequest(`${APP_URL_BACKEND}/api/password`, {
      status: 409,
      response: { error: 'The email provided does not exist' },
    });

    const userEmail = {
      email: 'niyo@gmail.com',
    };
    await store.dispatch(submitEmail.submitEmail(userEmail));
    expect(store.getActions()).toEqual([
      {
        type: EMAIL_SUBMIT,
        payload: userEmail,
      },
      {
        type: SUBMIT_FAILURE,
        payload: 'The email provided does not exist',
      },
    ]);
  });
});
