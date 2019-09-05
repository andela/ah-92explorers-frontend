import reducer from '../../redux/reducers/viewUser';

import {
  CHECK_FOLLOW,
  VIEW_USER,
  VIEW_USER_ERROR,
} from '../../redux/actions/actionTypes';


describe('Testing Reducers Action type CHECK_FOLLOW', () => {
  test(' Reducer should be ', () => {
    const action = { type: CHECK_FOLLOW, payload: {} };
    expect(reducer({}, action)).toEqual({ checkFollower: { }, loading: false, error: null });
  });
});

describe('Testing Sign up reducers action type VIEW_USER', () => {
  test(' Reducer should be', () => {
    const action = { type: VIEW_USER, payload: { } };
    expect(reducer({}, action)).toEqual({ viewUser: { }, loading: false, error: null });
  });
});

describe('Testing Reducers Action type VIEW_USER_ERROR', () => {
  test(' Reducer should be ', () => {
    const action = { type: VIEW_USER_ERROR, payload: { } };
    expect(reducer({}, action)).toEqual({loading: false, error: {}, viewUser: null  });
  });
});
