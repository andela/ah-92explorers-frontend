import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  FOLLOWERS_SUCCESS,
  FOLLOWERS_USERS_SUCCESS,
  FOLLOWERS_FAILURE,
  FOLLOWING_FAILURE,
  FOLLOWING_SUCCESS,
  FOLLOWING_USERS_SUCCESS
} from '../../redux/actions/actionTypes/profile';
import profile from '../../redux/reducers/profile';
import reducer from '../../redux/reducers/profile';
import {
  OPTED_IN_OUT,
  OPTED_IN_OUT_FAIL
} from '../../redux/actions/actionTypes/profile';
import notifications from '../../redux/reducers/notifications'

describe('profile reducer', () => {
  it('should return default state', () => {
    const newSate = profile([], {});
    expect(newSate).toEqual([]);
  });

  it('should return new state if action type is GET_PROFILE', () => {
    const payload = {
      loading: false,
      profile: {
        username: 'isaiah',
        firstName: 'runoro',
        lastName: 'isaie',
        phone: '+250788767676',
        location: 'gisozi',
        facebook: 'facebook.com/isaie',
        instagram: 'instagram.com/doe',
        linkedIn: 'linkedin.com/isaieDoe',
        twitter: 'twitter.com/isaiah',
        bio: 'My bio',
        image: 'image',
      },
      error: null,
    };
    const newSate = profile([], {
      type: GET_PROFILE,
      payload,
    });
    expect(newSate).toEqual(payload);
  });
  it('should return new state if action type is UPDATE_PROFILE_SUCCESS', () => {
    const payload = {
      loading: false,
      profile: {
        username: 'isaiah',
        firstName: 'runoro',
        lastName: 'isaie',
        phone: '+250788767676',
        location: 'gisozi',
        facebook: 'facebook.com/isaie',
        instagram: 'instagram.com/doe',
        linkedIn: 'linkedin.com/isaieDoe',
        twitter: 'twitter.com/isaiah',
        bio: 'My bio',
        image: 'image',
      },
      error: null,
    };
    const newSate = profile([], {
      type: UPDATE_PROFILE_SUCCESS,
      payload,
    });
    expect(newSate).toEqual(payload);
  });
  it('should return new state if action type is PROFILE_ERROR', () => {
    const payload = {
      loading: false,
      profile: null,
      error: 'Error',
    };
    const newSate = profile([], {
      type: PROFILE_ERROR,
      payload: payload.error,
    });
    expect(newSate).toEqual(payload);
  });

  it('should return payload when UPDATE_PROFILE_FAIL types performed', () => {
    const payload = {
      loading: false,
      profile: null,
      error: 'Error',
    };
    const newSate = profile([], {
      type: UPDATE_PROFILE_FAIL,
      payload: payload.error,
    });
    expect(newSate).toEqual(payload);
  });
  it('should return new state OPTED_IN_OUT', () => {
    const payload = {
      message: "successful",
      allow: true,
    };

    const expecting = {response:{
      "allow": true,
      "message": "successful",
    }
  };

    const newSate = notifications([], {
      type: OPTED_IN_OUT,
      payload: payload,
    });
    expect(newSate).toEqual(expecting);
  });
  it('should return new state OPTED_IN_OUT_FAILED', () => {
    const payload = {
      error: 'Error',
    };
    const newSate = notifications([], {
      type: OPTED_IN_OUT_FAIL,
      payload: payload.error,
    });
    expect(newSate).toEqual(payload);
  });
});

describe('Testing Reducers Action type UPDATE_PROFILE_FAIL', () => {
  test(' Reducer should be ', () => {
    const action = { type: UPDATE_PROFILE_FAIL, payload: {} };
    expect(reducer({}, action)).toEqual({ loading:false, profile: null, error: {} });
  });
});

describe('Testing Sign up reducers action type UPDATE_PROFILE_SUCCESS', () => {
  test(' Reducer should be', () => {
    const action = { type: UPDATE_PROFILE_SUCCESS, payload: { } };
    expect(reducer({}, action)).toEqual({ loading:false, profile: undefined, error: null });
  });
});

describe('Testing Reducers Action type UPDATE_PROFILE_FAIL', () => {
  test(' Reducer should be ', () => {
    const action = { type: UPDATE_PROFILE_FAIL, payload: { } };
    expect(reducer({}, action)).toEqual({ loading:false, profile: null, error: {} });
  });
});

describe('Testing Reducers Action type FOLLOWERS_USERS_SUCCESS', () => {
  test(' Reducer should be ', () => {
    const action = { type: FOLLOWERS_USERS_SUCCESS, payload: {} };
    expect(reducer({}, action)).toEqual({ loading:false, followerUsers: {}, error: null });
  });
});

describe('Testing Sign up reducers action type FOLLOWERS_SUCCESS', () => {
  test(' Reducer should be', () => {
    const action = { type: FOLLOWERS_SUCCESS, payload: { } };
    expect(reducer({}, action)).toEqual({ loading:false, followers: {}, error: null });
  });
});

describe('Testing Reducers Action type FOLLOWERS_FAILURE', () => {
  test(' Reducer should be ', () => {
    const action = { type: FOLLOWERS_FAILURE, payload: { } };
    expect(reducer({}, action)).toEqual({ loading:false, followers: null, error: { } });
  });
});

describe('Testing Reducers Action type FOLLOWING_SUCCESS', () => {
  test(' Reducer should be ', () => {
    const action = { type: FOLLOWING_SUCCESS, payload: { } };
    expect(reducer({}, action)).toEqual({ loading:false, following: {}, error: null });
  });
});

describe('Testing Reducers Action type FOLLOWING_USERS_SUCCESS', () => {
  test(' Reducer should be ', () => {
    const action = { type: FOLLOWING_USERS_SUCCESS, payload: { } };
    expect(reducer({}, action)).toEqual({ loading:false, followingUsers: {}, error: null });
  });
});

describe('Testing Reducers Action type FOLLOWING_FAILURE', () => {
  test(' Reducer should be ', () => {
    const action = { type: FOLLOWING_FAILURE, payload: { } };
    expect(reducer({}, action)).toEqual({ loading:false, following: null, error: {} });
  });
});

