import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Social } from '../../components/Auth/Social';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
describe('Render SocialLogin component', () => {
  it('to have wrapper class', async () => {
    const wrapper = mount(<Provider store={store}><Social /></Provider>);
    const btn = wrapper.find('.btn-icon').first();
    const mockedEvent = { target: { id: 'facebook' } };
    btn.simulate('click', mockedEvent);
    expect(btn.length).toBe(1);
  });
});
