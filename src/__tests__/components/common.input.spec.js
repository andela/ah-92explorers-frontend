import '@babel/polyfill';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import configureMockStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import Input from '../../components/Common/Input';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const props = {
  getInfo: jest.fn(),
  onChange: jest.fn(),
  name: 'input',
  value: 'hola',
  type: 'text',
};
describe('Render Common Input component', () => {
  it('to have wrapper class', async () => {
    const wrapper = mount(<MemoryRouter><Provider store={store}><Input {...props} /></Provider></MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });
});
