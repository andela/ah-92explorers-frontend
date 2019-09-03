import reducer from '../../redux/reducers/resetPassword';

import {
  EMAIL_SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAILURE,
} from '../../redux/actions/actionTypes';


describe('Testing Reducers Action type EMAIL_SUBMIT', () => {
  test(' Reducer should be ', () => {
    const action = { type: EMAIL_SUBMIT, payload: {} };
    expect(reducer({}, action)).toEqual({ userResetPsw: { emailSubmitting: {} } });
  });
});

describe('Testing Sign up reducers action type SUBMIT_SUCCESS', () => {
  test(' Reducer should be', () => {
    const action = { type: SUBMIT_SUCCESS, payload: { } };
    expect(reducer({}, action)).toEqual({ userResetPsw: { submittedSuccess: {} } });
  });
});

describe('Testing Reducers Action type SUBMIT_FAILURE', () => {
  test(' Reducer should be ', () => {
    const action = { type: SUBMIT_FAILURE, payload: { } };
    expect(reducer({}, action)).toEqual({ userResetPsw: { submittedFailure: {} } });
  });
});
