/* eslint-disable consistent-return */
import '@babel/polyfill';
import dotenv from 'dotenv';
import axios from 'axios';
import {
  CREATE_ARTICLE, GET_ARTICLE, FAILED_ARTICLE_CREATION,
  FAILED_ARTICLE_UPDATE, UPDATE_ARTICLE, SET_LOADING,
} from '../actionTypes';

dotenv.config();

const setLoading = (data) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: data,
  });
};

export const publishArticle = (articleData) => async (dispatch) => {
  try {
    const { title, body } = articleData;
    if (!title || title.length < 5 || !body) {
      return dispatch({
        type: FAILED_ARTICLE_CREATION,
        payload: {
          error: 'Did you forget to write a title/body!!!',
        },
      });
    }
    const article = await axios.post(`${process.env.APP_URL_BACKEND}/api/articles`, articleData, { headers: { Authorization: localStorage.getItem('jwtToken') } });
    dispatch({
      type: CREATE_ARTICLE,
      payload: article.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ARTICLE_CREATION,
      payload: error.response.data,
    });
  }
};

export const updateArticle = (articleData, slug) => async (dispatch) => {
  try {
    const { title, body } = articleData;
    if (!title || title.length < 5 || !body) {
      return dispatch({
        type: FAILED_ARTICLE_UPDATE,
        payload: {
          error: 'Did you forget to write a title/body!!!',
        },
      });
    }
    const article = await axios.put(`${process.env.APP_URL_BACKEND}/api/articles/${slug}`, articleData, { headers: { Authorization: localStorage.getItem('jwtToken') } });
    dispatch({
      type: UPDATE_ARTICLE,
      payload: article.data,
    });
  } catch (error) {
    dispatch({
      type: FAILED_ARTICLE_UPDATE,
      payload: error.response.data,
    });
  }
};

export const getArticle = (slug) => async (dispatch) => {
  dispatch(setLoading(true));
  const article = await axios.get(`${process.env.APP_URL_BACKEND}/api/articles/${slug}/`);
  dispatch({
    type: GET_ARTICLE,
    payload: article.data.article,
  });
  dispatch(setLoading(false));
};
