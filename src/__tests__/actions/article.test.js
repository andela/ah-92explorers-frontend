import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import dotenv from 'dotenv';
import {
    CREATE_ARTICLE, GET_ARTICLE, FAILED_ARTICLE_CREATION, UPDATE_ARTICLE, FAILED_ARTICLE_UPDATE,
  } from '../../redux/actions/actionTypes';
import { getArticle, publishArticle, updateArticle } from '../../redux/actions/actionCreators';

dotenv.config();

// The mockStore is for testing redux async creators. It will create an array of dispatched actions which serve as an action log
const mockStore = configureMockStore([thunk]);
const store  =  mockStore({});

describe('Testing Article Actions', () => {
    beforeEach(() => {
        moxios.install();
        store.clearActions();
    });

    afterEach(() => {
        moxios.uninstall()
    });

    it('should dispatch GET_ARTICLE incase of success', () => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                        article: {
                            message: 'successfully fetched article'
                        }
                }
            });
        });
        let expectedActions = [
            GET_ARTICLE
        ];
    
        return store.dispatch(getArticle('lessh1greaterwrite-a-titlelessh1greater-4')).then(() => {
            let dispatchedActions = store.getActions();
            let dispatchedTypes = dispatchedActions.map(action => action.type);
            expect(dispatchedTypes).toEqual(expectedActions);
        })
    });
    it('should dispatch CREATE_ARTICLE incase of success', () => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 201,
                response: {
                        article: {
                            message: 'Article successfully created'
                        }
                }
            });
        });
        let expectedActions = [
            CREATE_ARTICLE
        ];

        let data = {
            title: '<h1>So I remained</h1>',
            body: '<p>Kolai cncnsj ks</p>'
        }
    
        return store.dispatch(publishArticle(data)).then(() => {
            let dispatchedActions = store.getActions();
            let dispatchedTypes = dispatchedActions.map(action => action.type);
            expect(dispatchedTypes).toEqual(expectedActions);
        })
    });
    it('should dispatch FAILED_ARTICLE_CREATION incase of failed operation', () => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                error: 'Missing title/body'
            });
        });
        let expectedActions = [
            FAILED_ARTICLE_CREATION
        ];
    
        return store.dispatch(publishArticle({ title: undefined, body: undefined })).then(() => {
            let dispatchedActions = store.getActions();
            let dispatchedTypes = dispatchedActions.map(action => action.type);
            expect(dispatchedTypes).toEqual(expectedActions);
        })
    });
    it('should dispatch UPDATE_ARTICLE incase of success operation', () => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                        article: {
                            message: 'Article updated successfully'
                        }
                }
            });
        });
        let expectedActions = [
            UPDATE_ARTICLE 
        ]

        let data = {
            title: '<h1>So I remained</h1>',
            body: '<p>Kolai cncnsj ks</p>'
        }
    
        return store.dispatch(updateArticle(data)).then(() => {
            let dispatchedActions = store.getActions();
            let dispatchedTypes = dispatchedActions.map(action => action.type);
            expect(dispatchedTypes).toEqual(expectedActions);
        })
    });
    it('should dispatch FAILED_ARTICLE_UPDATE incase of failed operation', () => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response: {
                    article: {
                        error: 'Missing title/body'
                    }
                }
            });
        });
        let expectedActions = [
            FAILED_ARTICLE_UPDATE
        ];
    
        return store.dispatch(updateArticle({ title: undefined, body: undefined })).then(() => {
            let dispatchedActions = store.getActions();
            let dispatchedTypes = dispatchedActions.map(action => action.type);
            expect(dispatchedTypes).toEqual(expectedActions);
        })
    });
});
