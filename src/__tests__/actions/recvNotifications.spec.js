import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import dotenv from 'dotenv';
import { BrowserRouter as Router } from 'react-router-dom';
import {
    GET_NOTIFICATIONS, ARTICLE_READ, GET_NOTIFICATIONS_FAILURE
  } from '../../redux/actions/actionTypes';
import { getNotifications, readNotification } from '../../redux/actions/actionCreators';

dotenv.config();

// The mockStore is for testing redux async creators. It will create an array of dispatched actions which serve as an action log
const mockStore = configureMockStore([thunk]);
const store  =  mockStore({});

describe('Testing Notification Actions', () => {
    beforeEach(() => {
        moxios.install();
        store.clearActions();
    });

    afterEach(() => {
        moxios.uninstall()
    });

    it('should dispatch GET_NOTIFICATIONS incase of success', () => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    notifications: {
                        allNotification: []
                    }
                }
            });
        });
        let expectedActions = [
            GET_NOTIFICATIONS
        ];
    
        return store.dispatch(getNotifications()).then(() => {
            let dispatchedActions = store.getActions();
            let dispatchedTypes = dispatchedActions.map(action => action.type);

            expect(dispatchedTypes).toEqual(expectedActions);
        })
    });

    it('should dispatch ARTICLE_READ incase of success', () => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    notifications: {}
                }
            });
        });
        let expectedActions = [
            ARTICLE_READ
        ];
    
        return store.dispatch(readNotification('7df0e131-4321-44a5-8429-f64f71cde89f')).then(() => {
            let dispatchedActions = store.getActions();
            let dispatchedTypes = dispatchedActions.map(action => action.type);
            expect(dispatchedTypes).toEqual(expectedActions);
        })
    });
    it('should dispatch GET_NOTIFICATIONS_FAILURE incase of failure', () => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {
                    error: "something went wrong"
                }
            });
        });
        let expectedActions = [
            GET_NOTIFICATIONS_FAILURE
        ];
    
        return store.dispatch(getNotifications()).then(() => {
            let dispatchedActions = store.getActions();
            let dispatchedTypes = dispatchedActions.map(action => action.type);
            expect(dispatchedTypes).toEqual(expectedActions);
        })
    });
    it('should dispatch ARTICLE_READ incase of failure', () => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
                response: {
                    error: "something went wrong"
                }
            });
        });
        let expectedActions = [
            GET_NOTIFICATIONS_FAILURE
        ];
    
        return store.dispatch(readNotification('7df0e131-4321-44a5-8429-f64f71cde89f')).then(() => {
            let dispatchedActions = store.getActions();
            let dispatchedTypes = dispatchedActions.map(action => action.type);
            expect(dispatchedTypes).toEqual(expectedActions);
        })
    });
});
