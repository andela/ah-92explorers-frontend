/* eslint-disable max-len */
import {
  BOOKMARK_ARTICLE_START,
  BOOKMARK_ARTICLE_SUCCESS,
  BOOKMARK_ARTICLE_FAILURE,
  BOOKMARK_GET_ALL,
  BOOKMARK_GET_ALL_FAIL,
} from '../actions/actionTypes/bookMark';

const initialState = {
  bookmarks: [],
  loading: true,
  error: null,
};
export default function (state = initialState, action) {
  const {
    type,
    payload,
  } = action;
  switch (type) {
    case BOOKMARK_ARTICLE_START: {
      return state;
    }
    case BOOKMARK_ARTICLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        bookmarks: state.bookmarks.includes(payload.article.id) ? state.bookmarks.filter(id => id !== payload.article.id) : [...state.bookmarks, payload.article.id],
      };
    }
    case BOOKMARK_ARTICLE_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    case BOOKMARK_GET_ALL_FAIL: {
      return {
        ...state,
        bookmark: payload,
      };
    }
    case BOOKMARK_GET_ALL: {
      return {
        ...state,
        bookmarks: payload.Bookmarks.map(article => article.article.id),
      };
    }
    default:
      return state;
  }
}
