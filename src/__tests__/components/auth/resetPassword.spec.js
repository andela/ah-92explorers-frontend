import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ResetPassword } from '../../../components/Auth/ResetPassoword.jsx';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('testing ResetPassword component', () => {
  test('should render ResetPassword component', () => {
    const props = { signUp: jest.fn() };
    const wrapper = shallow(<ResetPassword {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});

describe('Render class', () => {
  it('to have wrapper submit button', async () => {
    const wrapper = mount(
      <MemoryRouter>
      <Provider store={store}><ResetPassword /></Provider>
      </MemoryRouter>,
      );
    const form = wrapper.find('.resetPasswordForm__submit-form');
    const inputs = wrapper.find('.resetPasswordForm__submit-form input');
    const correctInputs = {
      email: 'abcde@gmail.com',
    };

    inputs.map(input => input.simulate('change', {
      name: input.instance().name,
      value: correctInputs[input.instance().name],
    }));

    form.simulate('submit', { preventDefault: jest.fn() });
    expect(form.length).toBe(1);
  });
});
