import React from 'react';
import { shallow } from 'enzyme';
import LoginComponent from '../../../components/Auth/Login.jsx';

describe('<Login />', () => {
  let wrapper;

  const props = {
    login: jest.fn(),
    email: '',
    password: '',
    errors: {},
  };

  beforeEach(() => {
    wrapper = shallow(<LoginComponent {...props} />);
  });

  it('should render Login component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render two <Input /> elements', () => {
    expect(wrapper.find('Input')).toHaveLength(2);
  });
});
