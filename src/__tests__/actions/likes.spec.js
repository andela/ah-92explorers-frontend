import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import dotenv from 'dotenv';
import { LIKE_ARTICLE, DISLIKE_ARTICLE } from '../../redux/actions/actionTypes';
import { likeArticle, dislikeArticle } from '../../redux/actions/actionCreators';

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
    it('should like an article', () => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                response:  {
                        message: 'successfully liked article'
                    }
            });
        });
        let expectedActions = [
            LIKE_ARTICLE
        ];
        return store.dispatch(likeArticle('wrtite-a-tial')).then(() => {
            let dispatchedActions = store.getActions();
            let dispatchedTypes = dispatchedActions.map(action => action.type);
        })
    });
    it('should dislike an article', () => {
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                response:  {
                        message: 'successfully liked article'
                    }
            });
        });
        let expectedActions = [
            DISLIKE_ARTICLE
        ];
        return store.dispatch(dislikeArticle('wrtite-a-tial')).then(() => {
            let dispatchedActions = store.getActions();
            let dispatchedTypes = dispatchedActions.map(action => action.type);
        })
    });
});