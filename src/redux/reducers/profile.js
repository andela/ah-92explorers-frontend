import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  FOLLOWERS_SUCCESS,
  FOLLOWERS_USERS_SUCCESS,
  FOLLOWERS_FAILURE,
  FOLLOWING_FAILURE,
  FOLLOWING_SUCCESS,
  FOLLOWING_USERS_SUCCESS,
  OPTED_IN_OUT,
  OPTED_IN_OUT_FAIL,
  READING_STATS_SUCCESS,
  READING_STATS_FAILURE,
  READING_STATS_TOT,
} from '../actions/actionTypes/profile';

const initialState = {
  profile: null,
  following: null,
  followers: null,
  followingUsers: null,
  followerUsers: null,
  readingStat: null,
  readingStatTot: null,
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
    case FOLLOWERS_SUCCESS:
      return {
        ...state,
        loading: false,
        followers: payload,
        error: null,
      };
    case FOLLOWERS_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        followerUsers: payload,
        error: null,
      };
    case FOLLOWERS_FAILURE:
      return {
        ...state,
        loading: false,
        followers: null,
        error: payload,
      };
    case FOLLOWING_SUCCESS:
      return {
        ...state,
        loading: false,
        following: payload,
        error: null,
      };
    case FOLLOWING_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        followingUsers: payload,
        error: null,
      };
    case FOLLOWING_FAILURE:
      return {
        ...state,
        loading: false,
        following: null,
        error: payload,
      };
    case READING_STATS_TOT:
      return {
        ...state,
        loading: false,
        readingStatTot: payload,
        error: null,
      };
    case READING_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        readingStat: payload,
        error: null,
      };
    case READING_STATS_FAILURE:
      return {
        ...state,
        loading: false,
        readingStat: null,
        error: payload,
      };
    default:
      return state;
  }
}
