import '@babel/polyfill';
import {
  toast,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {
  checkToken,
} from '../../../utils/checkToken';
import {
  BOOKMARK_ARTICLE_START,
  BOOKMARK_ARTICLE_SUCCESS,
  BOOKMARK_ARTICLE_FAILURE,
  BOOKMARK_GET_ALL,
  BOOKMARK_GET_ALL_FAIL,
} from '../actionTypes/bookMark';

toast.configure();

const performAction = (type, payload) => ({
  type,
  payload,
});

export const bookmarkArticle = (slug) => async (dispatch) => {
  checkToken();
  dispatch(performAction(BOOKMARK_ARTICLE_START));
  try {
    const res = await axios.post(`${process.env.APP_URL_BACKEND}/api/articles/${slug}/bookmark`);
    dispatch(performAction(BOOKMARK_ARTICLE_SUCCESS, res.data));
  } catch (error) {
    dispatch(performAction(BOOKMARK_ARTICLE_FAILURE, error));
    toast.error(error.message);
  }
};


export const getAllBookmarks = () => async (dispatch) => {
  checkToken();
  try {
    const res = await axios.get(`${process.env.APP_URL_BACKEND}/api/bookmark`);
    return dispatch(performAction(BOOKMARK_GET_ALL, res.data));
  } catch (error) {
    return dispatch(performAction(BOOKMARK_GET_ALL_FAIL, error));
  }
};
