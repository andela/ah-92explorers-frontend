import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Signup } from '../../../components/Auth/Signup.jsx';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('testing Signup component', () => {
  test('should render Signup component', () => {
    const props = {
      signUp: jest.fn(),
      displayError: jest.fn(),
      clearErrors: jest.fn(),
      signUpSuccess: { },
      signUpFailure: { },
    };
    const wrapper = shallow(<Signup {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});

describe('Render class', () => {
  it('to have wrapper submit button', async () => {
    const wrapper = mount(
    <MemoryRouter>
       <Provider store={store}><Signup /></Provider>
    </MemoryRouter>,
    );
    const form = wrapper.find('.signup-form');
    const inputs = wrapper.find('.signup-form input');

    const correctInputs = {
      email: 'abcde@gmail.com',
      username: 'abcde',
      password: '@Password11',
    };

    inputs.map(input => input.simulate('change', {
      name: input.instance().name,
      value: correctInputs[input.instance().name],
    }));

    form.simulate('submit', { preventDefault: jest.fn() });
    expect(form.length).toBe(1);
  });
});
