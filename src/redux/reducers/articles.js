import initialState from '../initialState';
import {
  CREATE_ARTICLE, GET_ARTICLE, FAILED_ARTICLE_CREATION, UPDATE_ARTICLE, FAILED_ARTICLE_UPDATE,
} from '../actions/actionTypes';

const articles = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    case UPDATE_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    case FAILED_ARTICLE_CREATION:
      return {
        ...state,
        article: action.payload,
      };
    case FAILED_ARTICLE_UPDATE:
      return {
        ...state,
        article: action.payload,
      };
    default:
      return initialState;
  }
};

export default articles;
