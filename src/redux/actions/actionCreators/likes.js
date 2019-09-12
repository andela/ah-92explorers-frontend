/* eslint-disable consistent-return */
import '@babel/polyfill';
import axios from 'axios';
import { LIKE_ARTICLE, DISLIKE_ARTICLE } from '../actionTypes';

export const likeArticle = (slug) => async (dispatch) => {
  const like = await axios.post(`${process.env.APP_URL_BACKEND}/api/like/${slug}`, { headers: { Authorization: localStorage.getItem('jwtToken') } });
  dispatch({
    type: LIKE_ARTICLE,
    payload: like.data,
  });
};

export const dislikeArticle = (slug) => async (dispatch) => {
  const dislike = await axios.post(`${process.env.APP_URL_BACKEND}/api/dislike/${slug}`, { headers: { Authorization: localStorage.getItem('jwtToken') } });
  dispatch({
    type: DISLIKE_ARTICLE,
    payload: dislike.data,
  });
};
