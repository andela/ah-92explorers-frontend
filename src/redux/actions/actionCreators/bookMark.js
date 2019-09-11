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
  GET_BOOKMARK_ARTICLE_SUCCESS,
  GET_BOOKMARK_ARTICLE_FAILURE,
  DELETE_BOOKMARK_ARTICLE_SUCCESS,
  DELETE_BOOKMARK_ARTICLE_FAILURE,
} from '../actionTypes/bookMark';

toast.configure();

const performAction = (type, payload) => ({
  type,
  payload,
});

export const fetchBookmarks = () => async (dispatch) => {
  checkToken();
  try {
    const res = await axios.post(`${process.env.APP_URL_BACKEND}/api/bookmark`);
    dispatch(performAction(GET_BOOKMARK_ARTICLE_SUCCESS, res.data));
  } catch (error) {
    dispatch(performAction(GET_BOOKMARK_ARTICLE_FAILURE, error));
    toast.error(error.message);
  }
};

export const removeBookmark = (slug) => async (dispatch) => {
  checkToken();
  try {
    const res = await axios.delete(`${process.env.APP_URL_BACKEND}/api/articles/${slug}/bookmark`);
    dispatch(performAction(DELETE_BOOKMARK_ARTICLE_SUCCESS, res.data));
  } catch (error) {
    dispatch(performAction(DELETE_BOOKMARK_ARTICLE_FAILURE, error));
    toast.error(error.message);
  }
};
