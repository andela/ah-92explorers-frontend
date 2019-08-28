import initialState from '../initialState';


import {
  SET_COMMENT_SUCCESS,
  SET_COMMENT_ERROR,
  GET_COMMENTS,
  SET_COMMENT_DELETE,
} from '../actions/actionTypes';

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.payload,
      };
    case SET_COMMENT_ERROR:
      return {
        ...state,
        commentError: action.payload,
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case SET_COMMENT_DELETE:
      return {
        ...state,
        isCommentDelete: action.payload,
      };
    default: return state;
  }
};
