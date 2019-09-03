import initialState from '../initialState';
import {
  CREATE_ARTICLE, GET_ARTICLE, FAILED_ARTICLE_CREATION, UPDATE_ARTICLE, FAILED_ARTICLE_UPDATE,
  GET_FEED, SET_LOADING, ARTICLE_GET_FAIL,
} from '../actions/actionTypes';

const articles = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ARTICLE:
      return {
        ...state,
        article: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: action.payload.article,
        owner: action.payload.owner,
        authenticated: action.payload.authenticated,
        fetched: true,
      };
    case GET_FEED:
      return {
        ...state,
        feed: action.payload,
        page: action.page,
        totalPages: action.totalPages,
        nextPage: action.nextPage,
        previousPage: action.previousPage,
      };
    case ARTICLE_GET_FAIL:
      return {
        ...state,
        article: action.error,
        fetched: false,
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
