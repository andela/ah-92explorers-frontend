import { social } from '../../redux/reducers/social.reducer';
import { socialTypes } from '../../redux/actions/actionTypes';
import initialState from '../../redux/initialState';

describe('social Reducer', () => {
  it('LOGIN_SUCCESS', () => {
    const action = {
      type: socialTypes.LOGIN_SUCCESS,
      user: {},
    };
    const resp = social({}, action);
    expect(resp.success).toBeTruthy();
  });

  it('LOGIN_FAILURE', () => {
    const action = {
      type: socialTypes.LOGIN_FAILURE,
      error: '',
    };
    const resp = social({}, action);
    expect(resp).toHaveProperty('error');
  });
  it('LOGIN_FAILURE', () => {
    const action = {};
    const resp = social({}, action);
    expect(resp).toEqual({});
  });
});

describe('initial state', () => {
  it('should start initial state', () => {
    const expectedState = {
      userSignup: {
        signUpSubmitting: '',
        signUpSuccess: '',
        signUpfailure: '',
      },
    };
    expect(initialState).toEqual(expectedState);
  });
});
