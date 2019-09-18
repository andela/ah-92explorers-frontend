/* eslint-disable max-len */
import initialState from '../initialState';

import {
  CREATE_ARTICLE,
  GET_ARTICLE,
  FAILED_ARTICLE_CREATION,
  UPDATE_ARTICLE,
  FAILED_ARTICLE_UPDATE,
  GET_FEED,
  SET_LOADING,
  GET_RATING,
  ARTICLE_GET_FAIL,
  RATE_ARTICLE_START,
  RATE_ARTICLE_SUCCESS,
  RATE_ARTICLE_FAILURE,
  GET_SEARCH_RESULTS,
  FAILED_TO_GET_SEARCH_RESULTS,
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
        article: {
          ...action.payload.article,
          rateAvg: Math.floor(action.payload.article.ratings ? (action.payload.article.ratings.reduce((accumulator, currentValue) => (accumulator + currentValue.rating), 0) / action.payload.article.ratings.length) : 0),
        },
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
    case RATE_ARTICLE_START:
      return {
        ...state,
        loading: true,
      };
    case RATE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        rating: {
          ...action.payload,
          rating: state.rating.rating || [],
        },
        alert: action.message,
        article: {
          ...state.article,
          rateAvg: action.payload.rating.rates,
        },
      };
    case RATE_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_SEARCH_RESULTS:
      return {
        ...state,
        feed: action.payload,
      };
    case FAILED_TO_GET_SEARCH_RESULTS:
      return {
        ...state,
        feed: action.payload,
      };
    case GET_RATING:
      return {
        ...state,
        rating: action.payload,
        article: {
          ...state.article,
          rateAvg: action.payload.rating ? (action.payload.rating.reduce((accumulator, currentValue) => accumulator.rating + currentValue.rating) / action.payload.rating.length) : 0,
        },
        fetched: true,
      };
    default:
      return state;
  }
};

export default articles;
