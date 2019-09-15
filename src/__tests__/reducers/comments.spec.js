import commentReducer from '../../redux/reducers/comments';
import {
    SET_COMMENT_SUCCESS,
    SET_COMMENT_ERROR,
    GET_COMMENTS,
    SET_COMMENT_DELETE,
    EDIT_COMMENT_HISTORY,
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

  it('should return new state if receiving type is EDIT_COMMENT_HISTORY', () => {
    const payload = {
      commentHistory: [
        {
          commentId: "1241c5a3-7109-4c5a-98f7-218e1427eda4",
          body: "Celestin you have the same comments, delete one",
          createdAt: "2019-09-13T08:46:07.013Z",
          updatedAt: "2019-09-13T08:46:07.013Z"
        },
        {
          commentId: "1241c5a3-7109-4c5a-98f7-218e1427eda5",
          body: "Cele you have the same comments, delete one",
          createdAt: "2019-09-13T08:46:07.013Z",
          updatedAt: "2019-09-13T08:46:07.013Z"
        }
      ]
    };
    const initialState = { 
      commentHistory: [],
    }
    const newState = commentReducer(initialState, {
      type: EDIT_COMMENT_HISTORY,
      payload,
    });
    expect(newState).toEqual({ commentHistory: payload });
  });
});
