import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
} from '../actions/actionTypes/profile';

const initialState = {
  profile: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload.profile,
        error: null,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload.profile,
        error: null,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        profile: null,
        error: payload,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        profile: null,
        error: payload,
      };

    default:
      return state;
  }
}
