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
  REPORT_ARTICLE_START,
  REPORT_ARTICLE_SUCCESS,
  REPORT_ARTICLE_FAILURE,
} from '../actionTypes/reportArticle';

toast.configure();

const performAction = (type, payload) => ({
  type,
  payload,
});

export const reportArticle = (bodyReport, slug) => async (dispatch) => {
  checkToken();
  dispatch(performAction(REPORT_ARTICLE_START));
  try {
    const res = await axios.post(`${process.env.APP_URL_BACKEND}/api/report/articles/${slug}`, bodyReport);
    dispatch(performAction(REPORT_ARTICLE_SUCCESS, res.data));
    toast.info(res.data.message);
  } catch (error) {
    dispatch(performAction(REPORT_ARTICLE_FAILURE, error));
  }
};
