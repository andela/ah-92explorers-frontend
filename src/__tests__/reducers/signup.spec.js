import reducer from '../../redux/reducers/signup';

import {
  SUBMITTING_CREDENTIALS,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../../redux/actions/actionTypes';


describe('Testing Reducers Action type SUBMITTING_CREDENTIALS', () => {
  test(' Reducer should be ', () => {
    const action = { type: SUBMITTING_CREDENTIALS, payload: {} };
    expect(reducer({}, action)).toEqual({ userSignup: { signUpSubmitting: {} } });
  });
});

describe('Testing Sign up reducers action type SIGN_UP_SUCCESS', () => {
  test(' Reducer should be', () => {
    const action = { type: SIGN_UP_SUCCESS, payload: { } };
    expect(reducer({}, action)).toEqual({ userSignup: { signUpSuccess: {} } });
  });
});

describe('Testing Reducers Action type SIGN_UP_FAILURE', () => {
  test(' Reducer should be ', () => {
    const action = { type: SIGN_UP_FAILURE, payload: { } };
    expect(reducer({}, action)).toEqual({ userSignup: { signUpFailure: {} } });
  });
});
