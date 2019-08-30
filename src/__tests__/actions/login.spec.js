import '@babel/polyfill';
import moxios from 'moxios';
import dotenv from 'dotenv';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from '../../redux/actions/actionTypes/login';
import * as actions from '../../redux/actions/actionCreators/login';

const mockStore = configureStore([thunk]);
const store = mockStore();

dotenv.config();
const { APP_URL_BACKEND } = process.env;
const http = axios.create({ APP_URL_BACKEND });


describe('Default actions', () => {
  it('Should return setCurrentUser type', () => {
    const user = { firstName: 'Eric', password: 'xxxxxx' };
    const response = actions.setCurrentUser(user);
    expect(response).toEqual({
      type: actionTypes.SET_CURRENT_USER,
      user,
    });
  });

  it('Should return setLoginPending type', () => {
    const isLoginPending = false;
    const response = actions.setLoginPending(isLoginPending);
    expect(response).toEqual({
      type: actionTypes.SET_LOGIN_PENDING,
      isLoginPending,
    });
  });

  it('Should return setLoginSuccess type', () => {
    const isLoginSuccess = false;
    const response = actions.setLoginSuccess(isLoginSuccess);
    expect(response).toEqual({
      type: actionTypes.SET_LOGIN_SUCCESS,
      isLoginSuccess,
    });
  });

  it('Should return setLoginError type', () => {
    const loginError = {};
    const response = actions.setLoginError(loginError);
    expect(response).toEqual({
      type: actionTypes.SET_LOGIN_ERROR,
      loginError,
    });
  });
});

describe('Login actions', () => {
  beforeEach(() => {
    moxios.install(http);
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall(http);
  });

  test('should return signed in successfully', async () => {
    moxios.stubRequest(`${APP_URL_BACKEND}/api/users/login`, {
      status: 200,
      response: { message: 'logged in' },
    });

    const user = {
      email: 'eric@gmail.com',
      password: '@Danny14',
    };
    await store.dispatch(actions.login(user.email, user.password));
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.SET_LOGIN_PENDING,
        isLoginPending: true,
      },
      {
        type: actionTypes.SET_LOGIN_SUCCESS,
        isLoginSuccess: false,
      },
      {
        type: actionTypes.SET_LOGIN_ERROR,
        loginError: null,
      },
    ]);
  });

  test('should not return signed in successfully', async () => {
    moxios.stubRequest(`${APP_URL_BACKEND}/api/users/login`, {
      status: 404,
      response: { error: 'user not found' },
    });

    const user = {
      email: 'xsddd2eff@gmail.com',
      password: '@Danny14',
    };
    await store.dispatch(actions.login(user.email, user.password));
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.SET_LOGIN_PENDING,
        isLoginPending: true,
      },
      {
        type: actionTypes.SET_LOGIN_SUCCESS,
        isLoginSuccess: false,
      },
      {
        type: actionTypes.SET_LOGIN_ERROR,
        loginError: null,
      },
    ]);
  });
});
