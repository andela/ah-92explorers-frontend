import moxios from 'moxios';
import dotenv from 'dotenv';
import store from '../../__mocks__/store';
import {
  bookmarkArticle, getAllBookmarks
} from '../../redux/actions/actionCreators/bookMark';
import {
  BOOKMARK_ARTICLE_SUCCESS
} from '../../redux/actions/actionTypes/bookMark';

dotenv.config();

describe('bookmarking action', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should bookmark article', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: 'Successfully bookmarked the article'
        },
      });
      request.respondWith({
        status: 204,
      });
    });

    return store.dispatch(bookmarkArticle()).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });

  it('should get bookmarked article', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Article bookmarks retrieved!'
        },
      });
    });

    return store.dispatch(getAllBookmarks()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should not get bookmarked article', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });
    return store.dispatch(getAllBookmarks()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should not bookmark article', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });
    return store.dispatch(bookmarkArticle()).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });
});