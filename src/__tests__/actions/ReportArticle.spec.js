import moxios from 'moxios';
import dotenv from 'dotenv';
import store from '../../__mocks__/store';
import {
    reportArticle
} from '../../redux/actions/actionCreators/reportArticle';
import {
  BOOKMARK_ARTICLE_SUCCESS
} from '../../redux/actions/actionTypes/bookMark';

dotenv.config();

describe('reporting action', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should report article', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: 'Successfully reported the article'
        },
      });
      request.respondWith({
        status: 204,
      });
    });

    return store.dispatch(reportArticle()).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });

  it('should get reported article', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Article reports retrieved!'
        },
      });
    });

    return store.dispatch(reportArticle()).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });

  it('should not get reported article', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });
    return store.dispatch(reportArticle()).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });

  it('should not get reported article', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
      });
    });
    return store.dispatch(reportArticle()).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });
});