import {
  toast,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {
  getArticle,
  getRating,
} from './articles';
import {
  checkToken,
} from '../../../utils/checkToken';
import {
  RATE_ARTICLE_START,
  RATE_ARTICLE_SUCCESS,
  RATE_ARTICLE_FAILURE,
} from '../actionTypes/rating';

toast.configure();

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
    toast.success(res.data.message);
  } catch (error) {
    dispatch(rateArticleFailure());
    toast.error(error.response.data.error);
  }
};
