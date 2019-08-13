import {
  GET_PROFILE,
  PROFILE_ERROR,
} from '../../redux/actions/actionTypes/profile';
import profile from '../../redux/reducers/profile';

describe('profile reducer', () => {
  it('should return default state', () => {
    const newSate = profile([], {});
    expect(newSate).toEqual([]);
  });

  it('should return new state if action type is GET_PROFILE OR UPDATE_PROFILE_SUCCESS', () => {
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

  it('should return new state if action type is PROFILE_ERROR OR UPDATE_PROFILE_FAIL', () => {
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
});
