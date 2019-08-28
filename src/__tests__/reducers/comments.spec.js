import commentReducer from '../../redux/reducers/comments';
import {
    SET_COMMENT_SUCCESS,
    SET_COMMENT_ERROR,
    GET_COMMENTS,
    SET_COMMENT_DELETE,
  } from '../../redux/actions/actionTypes';

const initialState = {
  loading: null,
  comment: {},
  commentError: null,
  comments: [],
  isCommentDelete: false,
};

describe('Login reducer', () => {
  it('Should return default state', () => {
    const newState = commentReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should return new state if receiving type is SET_COMMENT_SUCCESS', () => {
    const payload = {
      comment: {
        body: 'Hello you',
      },
    };
    const initialState = { 
        comment: {},
    }
    const newState = commentReducer(initialState, {
      type: SET_COMMENT_SUCCESS,
      payload,
    });
    expect(newState).toEqual({ comment: payload });
  });

  it('should return new state if receiving type is SET_COMMENT_ERROR', () => {
    const payload = {
      commentError: 'Not allowed'
    };
    const initialState = { 
      commentError: {},
    }
    const newState = commentReducer(initialState, {
      type: SET_COMMENT_ERROR,
      payload,
    });
    expect(newState).toEqual({ commentError: payload });
  });

  it('should return new state if receiving type is GET_COMMENTS', () => {
    const payload = {
      comments: [
        {
          id: "7e943b55",
          body: 'Hello'
        },
        {
          id: "7e943b56",
          body: 'Hi everyone'
        }
      ]
    };
    const initialState = { 
      comments: [],
    }
    const newState = commentReducer(initialState, {
      type: GET_COMMENTS,
      payload,
    });
    expect(newState).toEqual({ comments: payload });
  });

  it('should return new state if receiving type is SET_COMMENT_DELETE', () => {
    const payload = {
        isCommentDelete: false,
    };
    const initialState = { 
        isCommentDelete: false,
    }
    const newState = commentReducer(initialState, {
      type: SET_COMMENT_DELETE,
      payload,
    });
    expect(newState).toEqual({ isCommentDelete: payload });
  });
});
