import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { Continue } from '../../components/continue/continue';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const props = {
  getInfo: jest.fn(),
  user: {
    success: true,
  },
};
describe('Render SocialLogin component', () => {
  it('to have wrapper class', async () => {
    const wrapper = mount(<Provider store={store}><Continue {...props} /></Provider>);
    const btn = wrapper.find('button');
    btn.simulate('click');
    expect(btn.length).toBe(1);
  });
});
