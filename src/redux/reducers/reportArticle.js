/* eslint-disable max-len */
import {
  REPORT_ARTICLE_START,
  REPORT_ARTICLE_SUCCESS,
  REPORT_ARTICLE_FAILURE,
} from '../actions/actionTypes/reportArticle';

const initialState = {
  report: {
    reportSuccess: '',
    reportFailure: '',
  },
  loading: true,
  error: null,
};
export default function (state = initialState, action) {
  const {
    type,
    payload,
  } = action;
  switch (type) {
    case REPORT_ARTICLE_START: {
      return state;
    }
    case REPORT_ARTICLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        report: {
          reportSuccess: payload,
        },
      };
    }
    case REPORT_ARTICLE_FAILURE: {
      return {
        ...state,
        loading: false,
        report: {
          reportFailure: payload,
        },
      };
    }
    default:
      return state;
  }
}
