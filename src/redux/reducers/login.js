import isEmpty from 'lodash/isEmpty';
import {
  SET_CURRENT_USER, SET_LOGIN_PENDING,
  SET_LOGIN_SUCCESS, SET_LOGIN_ERROR,
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      };

    case SET_LOGIN_PENDING:
      return {
        ...state,
        isLoginPending: action.isLoginPending,
      };

    case SET_LOGIN_SUCCESS:
      return { ...state, isLoginSuccess: action.isLoginSuccess };

    case SET_LOGIN_ERROR:
      return { ...state, loginError: action.loginError };
    default: return state;
  }
};
