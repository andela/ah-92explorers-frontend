import loginReducer from '../../redux/reducers/login';
import {
  SET_CURRENT_USER, SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR,
} from '../../redux/actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
};

describe('Login reducer', () => {
  it('Should return default state', () => {
    const newState = loginReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should return new state if receiving type is SET_CURRENT_USER', () => {
    const userPayload = {
      isAuthenticated: false,
      user: undefined,
    };
    const newState = loginReducer(initialState, {
      type: SET_CURRENT_USER,
      payload: userPayload,
    });

    expect(newState).toEqual(userPayload);
  });

  it('should return new state if receiving type is SET_LOGIN_PENDING', () => {
    const loginPending = {
      isAuthenticated: false,
      isLoginPending: undefined,
      isLoginSuccess: false,
      loginError: null,
      user: {},
    };
    const newState = loginReducer(initialState, {
      type: SET_LOGIN_PENDING,
      payload: loginPending,
    });
    expect(newState).toEqual(loginPending);
  });

  it('should return new state if receiving type is SET_LOGIN_SUCCESS', () => {
    const loginSuccess = {
      isAuthenticated: false,
      isLoginPending: false,
      isLoginSuccess: undefined,
      loginError: null,
      user: {},
    };
    const newState = loginReducer(initialState, {
      type: SET_LOGIN_SUCCESS,
      payload: loginSuccess,
    });
    expect(newState).toEqual(loginSuccess);
  });

  it('should return new state if receiving type is SET_LOGIN_ERROR', () => {
    const loginError = {
      isAuthenticated: false,
      isLoginPending: false,
      isLoginSuccess: false,
      loginError: undefined,
      user: {},
    };
    const newState = loginReducer(initialState, {
      type: SET_LOGIN_ERROR,
      payload: loginError,
    });
    expect(newState).toEqual(loginError);
  });
});
