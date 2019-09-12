import initialState from '../initialState';
import {
  USER_FOLLOW, FOLLOW_FAILURE, UNFOLLOW_SUCCESS, FOLLOW_SUCCESS,
} from '../actions/actionTypes';


const follow = (state = initialState, action) => {
  switch (action.type) {
    case USER_FOLLOW:
      return {
        ...state,
        follow: {
          following: action.payload,
        },
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        follow: {
          followSuccess: action.payload,
        },
      };

    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        follow: {
          unfollowSuccess: action.payload,
        },
      };
    case FOLLOW_FAILURE:
      return {
        ...state,
        follow: {
          followFailure: action.payload,
        },
      };
    default:
      return initialState;
  }
};

export default follow;
