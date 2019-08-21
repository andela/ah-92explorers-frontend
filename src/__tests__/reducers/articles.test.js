import {
  CREATE_ARTICLE, GET_ARTICLE, FAILED_ARTICLE_CREATION, UPDATE_ARTICLE, FAILED_ARTICLE_UPDATE,
} from '../../redux/actions/actionTypes';
import articles from '../../redux/reducers/articles';

describe('Article Reducer', () => {
  it('should return payload when CREATE_ARTICLE types performed', () => {
    const payload = {
      message: 'created success',
      article: {
        title: 'title',
        body: 'body',
        slug: 'slug',
        image: 'image',
        tagList: 'sjdas',
        description: 'dskfdbsf',
      },
    };
    const initialState = {
      article: {},
    };
    const state = articles(initialState, {
      type: CREATE_ARTICLE,
      payload,
    });
    expect(state).toEqual({ article: payload });
  });
  it('should return payload when GET_ARTICLE types performed', () => {
    const payload = {
      article: {
        time: '2 minutes',
        slug: 'slug',
        title: 'title',
        description: 'description',
        body: 'Best ever',
        tagList: 'best',
        image: 'image',
      },
    };
    const initialState = {
      article: {},
    };
    const state = articles(initialState, {
      type: GET_ARTICLE,
      payload,
    });
    expect(state).toEqual({ article: payload });
  });
  it('should return payload when FAILED_ARTICLE_CREATION types performed', () => {
    const payload = {
      article: {
        error: 'failed to create article',
      },
    };
    const initialState = {
      article: {},
    };
    const state = articles(initialState, {
      type: FAILED_ARTICLE_CREATION,
      payload,
    });
    expect(state).toEqual({ article: payload });
  });
  it('should return payload when FAILED_ARTICLE_CREATION types performed', () => {
    const payload = {
      article: {
        message: 'Article updated successfully',
        article: {
          title: 'title',
          body: 'body',
          slug: 'slug',
          image: 'image',
          tagList: 'sjdas',
          description: 'dskfdbsf',
        },
      },
    };
    const initialState = {
      article: {},
    };
    const state = articles(initialState, {
      type: UPDATE_ARTICLE,
      payload,
    });
    expect(state).toEqual({ article: payload });
  });
  it('should return payload when FAILED_ARTICLE_CREATION types performed', () => {
    const payload = {
      article: {
        error: 'Failed to update the article, please try again',
      },
    };
    const initialState = {
      article: {},
    };
    const state = articles(initialState, {
      type: FAILED_ARTICLE_UPDATE,
      payload,
    });
    expect(state).toEqual({ article: payload });
  });
});
