import reducer from '../../redux/reducers/follow';

import {
  FOLLOW_SUCCESS,
  UNFOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  USER_FOLLOW, 
} from '../../redux/actions/actionTypes';

describe('Testing Reducers Action type FOLLOW_SUCCESS', () => {
  test(' Reducer should be ', () => {
    const action = { type: FOLLOW_SUCCESS, payload: {} };
    expect(reducer({}, action)).toEqual({ follow: { followSuccess: {} } });
  });
});

describe('Testing Reducers Action type UNFOLLOW_SUCCESS', () => {
  test(' Reducer should be ', () => {
    const action = { type: UNFOLLOW_SUCCESS, payload: {} };
    expect(reducer({}, action)).toEqual({ follow: { unfollowSuccess: {} } });
  });
});

describe('Testing Sign up reducers action type USER_FOLLOW', () => {
  test(' Reducer should be', () => {
    const action = { type: USER_FOLLOW, payload: { } };
    expect(reducer({}, action)).toEqual({ follow: { following: {} } });
  });
});

describe('Testing Reducers Action type FOLLOW_FAILURE', () => {
  test(' Reducer should be ', () => {
    const action = { type: FOLLOW_FAILURE, payload: { } };
    expect(reducer({}, action)).toEqual({ follow: { followFailure: {} } });
  });
});
