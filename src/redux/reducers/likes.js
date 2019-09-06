import initialState from '../initialState';
import { LIKE_ARTICLE, DISLIKE_ARTICLE } from '../actions/actionTypes';

const likes = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_ARTICLE:
      return {
        ...state,
        like: action.payload,
      };
    case DISLIKE_ARTICLE:
      return {
        ...state,
        like: action.payload,
      };
    default:
      return state;
  }
};

export default likes;
