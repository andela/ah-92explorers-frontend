import reducer from '../../redux/reducers/resettingPassword';

import {
  PASSWORD_RESET, RESET_SUCCESS, RESET_FAILURE,
} from '../../redux/actions/actionTypes';


describe('Testing Reducers Action type PASSWORD_RESET', () => {
  test(' Reducer should be ', () => {
    const action = { type: PASSWORD_RESET, payload: {} };
    expect(reducer({}, action)).toEqual({ resettingPsw: { passwordSubmitting: {} } });
  });
});

describe('Testing Sign up reducers action type RESET_SUCCESS', () => {
  test(' Reducer should be', () => {
    const action = { type: RESET_SUCCESS, payload: { } };
    expect(reducer({}, action)).toEqual({ resettingPsw: { resetSuccess: {} } });
  });
});

describe('Testing Reducers Action type RESET_FAILURE', () => {
  test(' Reducer should be ', () => {
    const action = { type: RESET_FAILURE, payload: { } };
    expect(reducer({}, action)).toEqual({ resettingPsw: { resetFailure: {} } });
  });
});
