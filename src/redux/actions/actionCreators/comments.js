/* eslint-disable import/no-cycle */
import dotenv from 'dotenv';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  SET_COMMENT_SUCCESS, SET_COMMENT_ERROR, GET_COMMENTS, SET_COMMENT_DELETE, EDIT_COMMENT_HISTORY,
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

export function editCommentHistory(commentHistory) {
  return {
    type: EDIT_COMMENT_HISTORY,
    payload: commentHistory,
  };
}

export const postComment = (commentData, slug) => async (dispatch) => {
  try {
    const data = {
      body: commentData,
    };
    if (!data.body || data.body.length < 2) {
      return dispatch(setCommentError('Please add a valid comment'));
    }
    const res = await axios.post(`${process.env.APP_URL_BACKEND}/api/articles/${slug}/comments`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });
    if (res.data.message === 'commented') {
      dispatch(setCommentSuccess('You\'ve commented'));
      return data;
    }
  } catch (error) {
    let errorMessage = null;
    if (error.response) {
      errorMessage = error.response.data.error;
    }
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
  } catch (error) {
    let errorMessage = null;
    if (error.response) {
      errorMessage = error.response.data.error;
    }
    dispatch(setCommentError(errorMessage));
    dispatch(setCommentDelete(false));
  }
};

export const updateComment = (commentData, id, lastComment) => async (dispatch) => {
  try {
    const data = {
      body: commentData,
    };
    if (!data.body || data.body.length < 2 || lastComment.trim() === commentData.trim()) {
      return dispatch(setCommentError('Please update to a new comment'));
    }
    const res = await axios.patch(`${process.env.APP_URL_BACKEND}/api/comments/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });
    if (res.data.message === 'successfully updated and tracked comment') {
      dispatch(setCommentSuccess('You\'ve updated the comment'));
      return data;
    }
  } catch (error) {
    let errorMessage = null;
    if (error.response) {
      errorMessage = error.response.data.error;
    } else {
      errorMessage = networkError;
    }
    return dispatch(setCommentError(errorMessage));
  }
};

export const fetchEditCommentHistory = (id) => async (dispatch) => {
  try {
    const editHistory = await axios.get(`${process.env.APP_URL_BACKEND}/api/comments/${id}`);
    return dispatch(editCommentHistory(editHistory.data.edits));
  } catch (error) {
    return dispatch(setCommentError(error.response.data.error));
  }
};

export const likeAComment = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.APP_URL_BACKEND}/api/article/comment/${id}/like`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });
    dispatch(setCommentSuccess(res.data.message));
  } catch (error) {
    let errorMessage = null;
    if (error.response) {
      errorMessage = error.response.data.error;
    }
    return dispatch(setCommentError(errorMessage));
  }
};
