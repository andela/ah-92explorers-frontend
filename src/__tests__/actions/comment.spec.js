import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import dotenv from 'dotenv';
import {
    SET_COMMENT_SUCCESS, SET_COMMENT_ERROR, SET_COMMENT_DELETE, EDIT_COMMENT_HISTORY
  } from '../../redux/actions/actionTypes';

import { postComment, getComments, fetchComments, deleteComment, 
    updateComment, editCommentHistory, fetchEditCommentHistory, 
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

    it('should dispatch SET_COMMENT_ERROR incase of update failed', async () => {
        let id = 'fdxfsfsdggggg';
        moxios.stubRequest(`${process.env.APP_URL_BACKEND}/api/comments/${id}`, {
            status: 500,
            response: { 
              error: 'failed to update and track comment' 
            },
          });

        let data = {
            body: 'I really like this article'
        }

        await store.dispatch(updateComment(data, id));
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
              error: 'successfully updated and tracked comment' 
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
    
    it('Should return all comments of an article', () => {
        const response = getComments();
        expect(response).toEqual({payload: undefined, type: "GET_COMMENTS"});
    });

    it('Should return all edit history of a comment', () => {
        const response = editCommentHistory();
        expect(response).toEqual({payload: undefined, type: "EDIT_COMMENT_HISTORY"});
    });
});
