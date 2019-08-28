import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ResettingPassword } from '../../../components/Auth/ResettingPassoword.jsx';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('testing ResettingPassword component', () => {
  test('should render ResettingPassword component', () => {
    const props = { signUp: jest.fn() };
    const wrapper = shallow(<ResettingPassword {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});

describe('Render class', () => {
  it('to have wrapper submit button', async () => {
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}><ResettingPassword /></Provider>
        </MemoryRouter>,
        );
    const form = wrapper.find('.resetPasswordForm__submit-form');
    const inputs = wrapper.find('.resetPasswordForm__submit-form input');

    const correctInputs = {
      password: 'abcde@gmail.com',
      token: 'fghjkl;kjhgcfxfghjkl;j',
    };

    inputs.map(input => input.simulate('change', {
      name: input.instance().name,
      value: correctInputs[input.instance().name],
    }));

    form.simulate('submit', { preventDefault: jest.fn() });
    expect(inputs).toHaveLength(2);
    expect(form.length).toEqual(1);
  });
});
