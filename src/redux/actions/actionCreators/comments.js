/* eslint-disable import/no-cycle */
import dotenv from 'dotenv';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  SET_COMMENT_SUCCESS, SET_COMMENT_ERROR, GET_COMMENTS, SET_COMMENT_DELETE,
} from '../actionTypes/comments';
import 'react-toastify/dist/ReactToastify.css';

dotenv.config();
toast.configure();

const networkError = 'Something went wrong. Check your internet connection.';

export function setCommentSuccess(comment) {
  return {
    type: SET_COMMENT_SUCCESS,
    payload: comment,
  };
}

export function setCommentError(commentError) {
  return {
    type: SET_COMMENT_ERROR,
    payload: commentError,
  };
}

export function getComments(comments) {
  return {
    type: GET_COMMENTS,
    payload: comments,
  };
}

export function setCommentDelete(isCommentDelete) {
  return {
    type: SET_COMMENT_DELETE,
    isCommentDelete,
  };
}

export const postComment = (commentData, slug) => async (dispatch) => {
  try {
    const data = {
      body: commentData,
    };
    if (!data.body || data.body.length < 2) {
      toast.warn('Please add a valid comment');
      return dispatch(setCommentError('Please add a valid comment'));
    }
    const res = await axios.post(`${process.env.APP_URL_BACKEND}/api/articles/${slug}/comments`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });
    if (res.data.message === 'commented') {
      dispatch(setCommentSuccess('You\'ve commented'));
      toast.success('You\'ve commented');
      return data;
    }
  } catch (error) {
    let errorMessage = null;
    if (error.response) {
      errorMessage = error.response.data.error;
    } else {
      errorMessage = networkError;
    }
    toast.error(errorMessage);
    return dispatch(setCommentError(errorMessage));
  }
};

export const fetchComments = (slug) => async (dispatch) => {
  try {
    const comments = await axios.get(`${process.env.APP_URL_BACKEND}/api/articles/${slug}/comments`);
    return dispatch(getComments(comments.data.article.comments));
  } catch (error) {
    return dispatch(setCommentError(error));
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.APP_URL_BACKEND}/api/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });
    dispatch(setCommentDelete(true));
    toast.success('Comment deleted successful');
  } catch (error) {
    let errorMessage = null;
    if (error.response) {
      errorMessage = error.response.data.error;
    }
    toast.error(errorMessage);
    dispatch(setCommentError(errorMessage));
    dispatch(setCommentDelete(false));
  }
};
