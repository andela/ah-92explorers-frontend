/* istanbul ignore file */
/* eslint-disable consistent-return */
import '@babel/polyfill';
import dotenv from 'dotenv';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  CREATE_ARTICLE,
  GET_ARTICLE,
  FAILED_ARTICLE_CREATION,
  FAILED_ARTICLE_UPDATE,
  UPDATE_ARTICLE,
  SET_LOADING,
  GET_FEED,
  ARTICLE_GET_FAIL,
  GET_RATING,
} from '../actionTypes';
import fetchImage from '../../../helpers/createDisplayImage';
import terrestial from '../../../assets/icons/terrestial.jpg';

dotenv.config();

const success = (article, owner, authenticated) => ({
  type: GET_ARTICLE,
  payload: {
    article,
    owner,
    authenticated,
  },
});

const performAction = (payload) => ({
  type: GET_RATING,
  payload,
});

export const setLoading = (data) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: data,
  });
};

export const publishArticle = (articleData) => async (dispatch) => {
  try {
    const {
      title,
      body,
      tagList,
    } = articleData;
    const tags = tagList[0];
    if (!title || title.length < 5 || !body) {
      return dispatch({
        type: FAILED_ARTICLE_CREATION,
        payload: {
          error: 'Did you forget to write a title/body!!!',
        },
      });
    }
    const newData = {
      title,
      body,
      tagList: tags === 'Tag' ? null : tags,
    };
    const article = await axios.post(`${process.env.APP_URL_BACKEND}/api/articles`, newData, {
      headers: {
        Authorization: localStorage.getItem('jwtToken'),
      },
    });
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
    const {
      title,
      body,
      tagList,
    } = articleData;
    const tags = tagList[0];
    if (!title || title.length < 5 || !body) {
      return dispatch({
        type: FAILED_ARTICLE_UPDATE,
        payload: {
          error: 'Did you forget to write a title/body!!!',
        },
      });
    }
    const newData = {
      title,
      body,
      tagList: tags === 'Tag' ? null : tags,
    };
    const article = await axios.put(`${process.env.APP_URL_BACKEND}/api/articles/${slug}`, newData, {
      headers: {
        Authorization: localStorage.getItem('jwtToken'),
      },
    });
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

export const deleteArticle = (slug) => async (dispatch) => {
  try {
    const del = await axios.delete(`${process.env.APP_URL_BACKEND}/api/articles/${slug}/`, {
      headers: {
        Authorization: localStorage.getItem('jwtToken'),
      },
    });
    if (del.status === 204) {
      window.location.replace('/');
    }
  } catch (error) {
    return dispatch({
      type: ARTICLE_GET_FAIL,
      error: 'something went wrong',
    });
  }
};

export const getArticle = (slug) => async (dispatch) => {
  const token = localStorage.getItem('jwtToken') && jwtDecode(localStorage.getItem('jwtToken'));
  let authenticated = false;
  try {
    if (token && token.email) authenticated = true;
    const articles = await axios.get(`${process.env.APP_URL_BACKEND}/api/articles/${slug}/`);
    if (articles.status === 404) {
      window.location.replace('/not-found');
    }
    const owner = token && token.id === articles.data.article.author.id;
    return dispatch(success(articles.data.article, owner, authenticated));
  } catch (error) {
    if (error.response && error.response.status === 404) window.location.replace('/not-found');
    return dispatch({
      type: ARTICLE_GET_FAIL,
      error: 'something went wrong',
    });
  }
};

export const getRating = (slug) => async (dispatch) => {
  const token = localStorage.getItem('jwtToken') && jwtDecode(localStorage.getItem('jwtToken'));
  let authenticated = false;
  try {
    if (token && token.email) authenticated = true;
    const res = await axios.get(`${process.env.APP_URL_BACKEND}/api/article/${slug}/rating`);
    dispatch(performAction(res.data, authenticated));
  } catch (error) {
    return dispatch(performAction('something went wrong'));
  }
};

export const getFeed = (page) => async (dispatch) => {
  dispatch(setLoading(true));
  const article = await axios.get(`${process.env.APP_URL_BACKEND}/api/articles/feed?page=${!page || page === undefined ? 1 : page}&limit=13`);
  const {
    articles,
  } = article.data;
  const newArticles = [];

  articles.forEach((art) => {
    if (art.title) {
      const newObject = {
        author: art.author.username || 'Isaiah',
        profile: art.author.image || terrestial,
        title: art.title.length > 25 ? `${art.title.slice(0, 20)}...` : art.title,
        image: fetchImage(art.body),
        slug: art.slug || 'No-weher',
        id: art.id,
        date: `${new Date(art.createdAt).toDateString()}` || 'Fri Aug 30 2019',
      };
      newArticles.push(newObject);
    }
  });
  dispatch({
    type: GET_FEED,
    payload: newArticles,
    page: article.data.metadata.currentPage,
    totalPages: article.data.metadata.totalPages,
    nextPage: article.data.metadata.nextPage,
    previousPage: article.data.metadata.previousPage,
  });
  dispatch(setLoading(false));
};
