import reportArticle from '../../redux/reducers/reportArticle';
import initialState from '../../redux/initialState';
import { REPORT_ARTICLE_START, REPORT_ARTICLE_SUCCESS, REPORT_ARTICLE_FAILURE } from '../../redux/actions/actionTypes/reportArticle';
import { article } from '../../__mocks__/store';

 describe('bookmark article reducers', () => {
  it('REPORT_ARTICLE_START', () => {
    const initialState = {
        article: {},
        report: {},
      };
    const reducer = reportArticle(initialState, {
      type: REPORT_ARTICLE_START,
    });
    expect(reducer).toHaveProperty('report');
  });
  it('REPORT_ARTICLE_SUCCESS', () => {
    
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
      report: {},
    };
    const state = reportArticle(initialState, {
      type: REPORT_ARTICLE_SUCCESS,
      payload,
    });
    expect(state).toHaveProperty('report');
  });
  it('REPORT_ARTICLE_FAILURE', () => {
    const reducer = reportArticle(initialState, {
      type: REPORT_ARTICLE_FAILURE,
      payload: { errors: { report: 'not reported' } }
    });
    expect(reducer).toHaveProperty('report');
  });
});
