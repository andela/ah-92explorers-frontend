import bookmarkArticle from '../../redux/reducers/bookmarkArticle';
import initialState from '../../redux/initialState';
import { BOOKMARK_ARTICLE_START, BOOKMARK_ARTICLE_SUCCESS, BOOKMARK_ARTICLE_FAILURE, BOOKMARK_GET_ALL_FAIL, BOOKMARK_GET_ALL, BOOKMARK_DELETE_SUCCESS, BOOKMARK_DELETE_FAIL, BOOKMARK_DELETE } from '../../redux/actions/actionTypes/bookMark';
import { article } from '../../__mocks__/store';

 describe('bookmark article reducers', () => {
  it('BOOKMARK_ARTICLE_START', () => {
    const reducer = bookmarkArticle(initialState, {
      type: BOOKMARK_ARTICLE_START,
      payload: { loading: true }
    });
    expect(reducer).toHaveProperty('bookmarks');
  });
  it('BOOKMARK_ARTICLE_SUCCESS', () => {
    
    const payload = {
      message: 'Successfully bookmarked the article',
      article: {
        id:"b0e9eb33",
        title:"Black Nigga",
        slug:"black-nigga"
      },
      loading: false
    };
    const initialState = {
      article: {},
      bookmarks: [],
    };
    const state = bookmarkArticle(initialState, {
      type: BOOKMARK_ARTICLE_SUCCESS,
      payload,
    });
    expect(state).toHaveProperty('bookmarks');
  });
  it('BOOKMARK_ARTICLE_FAILURE', () => {
    const reducer = bookmarkArticle(initialState, {
      type: BOOKMARK_ARTICLE_FAILURE,
      payload: { errors: { bookmark: 'not bookmarked' } }
    });
    expect(reducer).toHaveProperty('bookmarks');
  });
  it('GET_BOOKMARK_ARTICLE_FAILURE', () => {
    const reducer = bookmarkArticle(initialState, {
      type: BOOKMARK_GET_ALL_FAIL,
      payload: { errors: { bookmark: 'not bookmarked' } }
    });
    expect(reducer).toHaveProperty('bookmarks');
  });
  it('GET_BOOKMARK_ARTICLE', () => {
    const payload = {
      Bookmarks: []
    };
    const initialState = {
      bookmarks: [],
    };
    const state = bookmarkArticle(initialState, {
      type: BOOKMARK_GET_ALL,
      payload,
    });
    expect(state).toHaveProperty('bookmarks');
  });
  it('BOOKMARK_DELETE_SUCCESS', () => {
    const payload = {
      Bookmarks: []
    };
    const initialState = {
      bookmarks: [],
    };
    const state = bookmarkArticle(initialState, {
      type: BOOKMARK_DELETE_SUCCESS,
      payload,
    });
    expect(state).toHaveProperty('bookmarks');
  });
  it('BOOKMARK_DELETE_FAIL', () => {
    const reducer = bookmarkArticle(initialState, {
      type: BOOKMARK_DELETE_FAIL,
      payload: { errors: { bookmark: 'not bookmarked' } }
    });
    expect(reducer).toHaveProperty('bookmarks');
  });
  it('BOOKMARK_DELETE', () => {
    const reducer = bookmarkArticle(initialState, {
      type: BOOKMARK_DELETE,
      payload: { errors: { bookmark: 'not bookmarked' } }
    });
    expect(reducer).toHaveProperty('bookmarks');
  });
});
