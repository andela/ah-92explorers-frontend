import '@babel/polyfill';
import dotenv from 'dotenv';
import axios from 'axios';
import {
  CREATE_ARTICLE, GET_ARTICLE, FAILED_ARTICLE_CREATION,
  FAILED_ARTICLE_UPDATE, UPDATE_ARTICLE,
} from '../actionTypes';

dotenv.config();

export const publishArticle = (articleData) => async (dispatch) => {
  try {
    const { title, body } = articleData;
    if (!title || title.length < 15 || !body) {
      return dispatch({
        type: FAILED_ARTICLE_CREATION,
        payload: {
          error: 'Did you forget to write a title/body!!!',
        },
      });
    }
    const article = await axios.post(process.env.ARTICLE_CREATION_URL, articleData, { headers: { Authorization: `Bearer ${process.env.TOKEN}}` } });
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

export const updateArticle = (articleData) => async (dispatch) => {
  try {
    const { title, body } = articleData;
    if (!title || title.length < 15 || !body) {
      return dispatch({
        type: FAILED_ARTICLE_UPDATE,
        payload: {
          error: 'Did you forget to write a title/body!!!',
        },
      });
    }
    const article = await axios.put(process.env.UPDATE_ARTICLE_URL, articleData, { headers: { Authorization: `Bearer ${process.env.TOKEN}` } });
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
  const article = await axios.get(`${process.env.GET_ARTICLE_URL}${slug}`);
  dispatch({
    type: GET_ARTICLE,
    payload: article.data.article,
  });
};
