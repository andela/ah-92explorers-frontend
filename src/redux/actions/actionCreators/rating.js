import axios from 'axios';
import {
  getArticle,
} from './articles';
import {
  checkToken,
} from '../../../utils/checkToken';
import {
  RATE_ARTICLE_START,
  RATE_ARTICLE_SUCCESS,
  RATE_ARTICLE_FAILURE,
  GET_RATING,
} from '../actionTypes/rating';


const performAction = (payload) => ({
  type: GET_RATING,
  payload,
});

export const rateArticleStart = () => ({
  type: RATE_ARTICLE_START,
});

export const rateArticleSuccess = rating => ({
  type: RATE_ARTICLE_SUCCESS,
  payload: rating,
});

export const rateArticleFailure = () => ({
  type: RATE_ARTICLE_FAILURE,
});

export const articleRating = (slug, value) => async (dispatch) => {
  try {
    checkToken();
    const dataValue = {
      rating: value,
    };

    dispatch(rateArticleStart());
    const res = await axios.post(`${process.env.APP_URL_BACKEND}/api/article/${slug}/rate`, dataValue);
    dispatch(rateArticleSuccess(res.data));
    dispatch(getArticle(slug));
  } catch (error) {
    dispatch(rateArticleFailure());
  }
};

export const getRating = (slug) => async (dispatch) => {
  checkToken();
  try {
    const res = await axios.get(`${process.env.APP_URL_BACKEND}/api/article/${slug}/rating`);
    dispatch(performAction(res.data));
  } catch (error) {
    return dispatch(performAction('something went wrong'));
  }
};
