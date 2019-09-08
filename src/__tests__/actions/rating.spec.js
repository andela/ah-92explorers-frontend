import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as types from '../../redux/actions/actionTypes/rating';
import * as actions from '../../redux/actions/actionCreators/rating';
import { SET_LOADING } from '../../redux/actions/actionTypes';
import axios from 'axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {};
const store = mockStore(initialState);


describe('rate Article Tests', () => {
  afterEach(() => {
    moxios.install(axios);
    store.clearActions();
  });

  afterEach(() => moxios.uninstall(axios));

  it('Return failure if rate article was unsuccessful', (done) => {

    jest.spyOn(axios, 'post').mockRejectedValue({ response: { data: { message: '' } } });


    const expectedActions = [
      {
        type: types.RATE_ARTICLE_START,
      },
      {
        type: types.RATE_ARTICLE_FAILURE,
      },
    ];

    store.dispatch(actions.articleRating(3))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });

  });
});