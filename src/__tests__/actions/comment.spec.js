import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import dotenv from 'dotenv';
import {
    SET_COMMENT_SUCCESS, SET_COMMENT_ERROR, SET_COMMENT_DELETE, EDIT_COMMENT_HISTORY
  } from '../../redux/actions/actionTypes';

import { postComment, getComments, fetchComments, deleteComment, 
    updateComment, editCommentHistory, fetchEditCommentHistory, likeAComment
} from '../../redux/actions/actionCreators';

dotenv.config();

// The mockStore is for testing redux async creators. It will create an array of dispatched actions which serve as an action log
const mockStore = configureMockStore([thunk]);
const store  =  mockStore({});

describe('Testing Comment Actions', () => {
    beforeEach(() => {
        moxios.install();
        store.clearActions();
    });

    afterEach(() => {
        moxios.uninstall()
    });

    it('should dispatch SET_COMMENT_SUCCESS incase of create success', () => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
                response: {
                    message: 'commented'
                }
            });
        });
        let expectedActions = [
            SET_COMMENT_SUCCESS,
        ];

        let data = {
            body: 'I really like this article'
        }
    
        return store.dispatch(postComment(data, 'titleless')).then(() => {
            let dispatchedActions = store.getActions();
            let dispatchedTypes = dispatchedActions.map(action => action.type);
            expect(dispatchedTypes).toEqual(expectedActions);
        })
    });

    it('should dispatch SET_COMMENT_ERROR incase a comment is undefined', async () => {
        const slug = 'the-basics-of-nodejs'
        moxios.stubRequest(`${process.env.APP_URL_BACKEND}/api/articles/${slug}/comments`, {
            response: { 
              error: 'Please add a valid comment' 
            },
          });
      
        const data = '';
          await store.dispatch(postComment(data, slug));
          expect(store.getActions()).toEqual([
            {
                payload: "Please add a valid comment",
                type: SET_COMMENT_ERROR,
            },
          ]);
    });        

    it('should dispatch SET_COMMENT_ERROR incase of adding a comment failed', async () => {
        const slug = 'zxxxxfdxfsfsdggggg'
        moxios.stubRequest(`${process.env.APP_URL_BACKEND}/api/articles/${slug}/comments`, {
            status: 404,
            response: { 
              error: 'article or user not found' 
            },
          });
      
        const data = {
            body: 'Hello everyone',
        };

          await store.dispatch(postComment(data, slug));
          expect(store.getActions()).toEqual([
            {
                payload: "article or user not found",
                type: SET_COMMENT_ERROR,
            },
          ]);
    });        


    it('should dispatch SET_COMMENT_ERROR incase no comment or article provided', () => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                error: 'Something went wrong. Check your internet connection.'
            });
        });
        let expectedActions = [
            SET_COMMENT_ERROR
        ];
        return store.dispatch(postComment()).then(() => {
            let dispatchedActions = store.getActions();
            let dispatchedTypes = dispatchedActions.map(action => action.type);
            expect(dispatchedTypes).toEqual(expectedActions);
        })
    });

    it('should dispatch GET_COMMENTS incase of success', () => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    message: 'successfully fetched comments of this article'
                }
            });
        });
        let expectedActions = [
            SET_COMMENT_ERROR,
        ];
    
        return store.dispatch(fetchComments('the-basics-of-nodejs')).then(() => {
            let dispatchedActions = store.getActions();
            let dispatchedTypes = dispatchedActions.map(action => action.type);
            expect(dispatchedTypes).toEqual(expectedActions);
        })
    });

    it('should dispatch SET_COMMENT_DELETE incase of success', () => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 204,
            });
        });
        let expectedActions = [
            SET_COMMENT_DELETE
        ];
    
        return store.dispatch(deleteComment('9aae2977')).then(() => {
            let dispatchedActions = store.getActions();
            let dispatchedTypes = dispatchedActions.map(action => action.type);
            expect(dispatchedTypes).toEqual(expectedActions);
            expect(jest.isMockFunction(window.location.reload)).toBe(false);
        })
    });

    it('should dispatch SET_COMMENT_ERROR incase of deletion failed', async () => {
        const commentId = 'fdxfsfsdggggg'
        moxios.stubRequest(`${process.env.APP_URL_BACKEND}/api/comments/${commentId}`, {
            status: 404,
            response: { 
              error: 'failed to find comment' 
            },
          });
      
          await store.dispatch(deleteComment(commentId));
          expect(store.getActions()).toEqual([
            {
              type: SET_COMMENT_ERROR,
              payload: 'failed to find comment' 
            },
            {
              type: SET_COMMENT_DELETE,
              isCommentDelete: false,
              
            },
          ]);
    });   

    it('should dispatch SET_COMMENT_ERROR incase a comment is undefined', async () => {
        let id = 'fdxfsfsdggggg';
        moxios.stubRequest(`${process.env.APP_URL_BACKEND}/api/comments/${id}`, {
            response: { 
              error: 'Please add a valid comment' 
            },
          });
      
        const data = '';
          await store.dispatch(updateComment(data, id));
          expect(store.getActions()).toEqual([
            {
                payload: "Please update to a new comment",
                type: SET_COMMENT_ERROR,
            },
          ]);
    });    
    
    it('should dispatch data incase of update succeeded', async () => {
        let id = '3ca905f2-20ef-40c2-a56d-9565793b5aae';
        moxios.stubRequest(`${process.env.APP_URL_BACKEND}/api/comments/${id}`, {
            status: 200,
            response: { 
              message: 'successfully updated and tracked comment' 
            },
          });

        let commentData = 'I really like this article'

        let lastComment = '4a82e67b-8b7b-491b-9b67-a23caf9b30d6';
        await store.dispatch(updateComment(commentData, id, lastComment));
        expect(store.getActions()).toEqual([
        {
            type: SET_COMMENT_SUCCESS,
            payload: 'You\'ve updated the comment' 
        },
        ]);
    });   

    it('should dispatch SET_COMMENT_ERROR incase of update failed', async () => {
        let id = 'f';
        moxios.stubRequest(`${process.env.APP_URL_BACKEND}/api/comments/${id}`, {
            status: 500,
            response: { 
              error: 'failed to update and track comment' 
            },
          });

        let commentData = 'I really like this article'
        let lastComment = '4a82e67b-8b7b-491b-9b67-a23caf9b30d6';
        await store.dispatch(updateComment(commentData, id, lastComment));
        expect(store.getActions()).toEqual([
        {
            type: SET_COMMENT_ERROR,
            payload: 'failed to update and track comment' 
        },
        ]);
    });   

    it('should dispatch SET_COMMENT_ERROR incase of update failed', async () => {
        let id = 'f';
        moxios.stubRequest(`${process.env.APP_URL_BACKEND}/api/comments/${id}`, {
            status: 500,
            response: { 
              error: 'Something went wrong. Check your internet connection.' 
            },
          });

        let commentData = {
            body: 'I really like this article'
        }

        let lastComment = '4a82e67b-8b7b-491b-9b67-a23caf9b30d6';
        await store.dispatch(updateComment(commentData, id, lastComment));
        expect(store.getActions()).toEqual([
        {
            type: SET_COMMENT_ERROR,
            payload: 'Something went wrong. Check your internet connection.' 
        },
        ]);
    });   

    it('should dispatch EDIT_COMMENT_HISTORY incase of success', async () => {
        let id = 'bc608ed6-1fb7-48aa-9613-ea9e5bd56402';
        moxios.stubRequest(`${process.env.APP_URL_BACKEND}/api/comments/${id}`, {
            status: 200,
            response: { 
              commment: {},
              edit: [], 
            },
          });

        await store.dispatch(fetchEditCommentHistory(id));
        expect(store.getActions()).toEqual([
        {
            type: EDIT_COMMENT_HISTORY,
            payload: undefined, 
        },
        ]);
    });   

    it('should dispatch error incase EDIT_COMMENT_HISTORY fails', async () => {
        let id = '[bc608ed6-1fb7-48aa-9613-ea9e5bd56402]';
        moxios.stubRequest(`${process.env.APP_URL_BACKEND}/api/comments/${id}`, {
            status: 500,
            response: { 
              error: 'failed to get comment' 
            },
          });

        await store.dispatch(fetchEditCommentHistory(id));
        expect(store.getActions()).toEqual([
        {
            type: SET_COMMENT_ERROR,
            payload: 'failed to get comment'
        },
        ]);
    }); 
    

    it('should dispatch data incase of like success', async () => {
        let id = '3ca905f2-20ef-40c2-a56d-9565793b5aae';
        moxios.stubRequest(`${process.env.APP_URL_BACKEND}/api/article/comment/${id}/like`, {
            status: 201,
            response: {
                message: 'you liked this comment'
            }
          });

        await store.dispatch(likeAComment(id));
        expect(store.getActions()).toEqual([
        {
            type: SET_COMMENT_SUCCESS,
            payload: 'you liked this comment' 
        },
        ]);
    }); 

    it('should dispatch an error incase of like comment fails', async () => {
        let id = 'd';
        moxios.stubRequest(`${process.env.APP_URL_BACKEND}/api/article/comment/${id}/like`, {
            status: 500,
            response: {
                message: 'Failed to like this comment, please try again'
            }
          });

        await store.dispatch(likeAComment(id));
        expect(store.getActions()).toEqual([
            {
                type: SET_COMMENT_ERROR,
                payload: undefined, 
            },
        ]);
    }); 
    
    it('Should return all comments of an article', () => {
        const response = getComments();
        expect(response).toEqual({payload: undefined, type: "GET_COMMENTS"});
    });

    it('Should return all edit history of a comment', () => {
        const response = editCommentHistory();
        expect(response).toEqual({payload: undefined, type: "EDIT_COMMENT_HISTORY"});
    });
});
