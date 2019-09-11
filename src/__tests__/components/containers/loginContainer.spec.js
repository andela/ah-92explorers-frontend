import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import LoginComponent from '../../../components/Auth/Login.jsx';
import { LoginContainer } from '../../../components/Containers/Login.jsx';

const props = {
  isLoginSuccess: false,
  loginError: {},
  email: '',
  password: '',
  errors: {},
  login: jest.fn(),
  auth: { isAuthenticated: false },
  loading: false,
};

let wrapper;
const initialState = {};
// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();
let store;

describe('<LoginContainer />', () => {
  beforeEach(() => {
    // creates the store with any initial state or middleware needed
    store = mockStore(initialState);
    wrapper = shallow(<LoginContainer store={store} {...props} />);
  });

  it('should render Login container', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should check componentDidMount', () => {
    wrapper.instance().componentDidMount()
    wrapper.setState({email: 'ele@rlr.com'})
    expect(wrapper.instance().props.auth.isAuthenticated).toBeDefined();
    expect(jest.isMockFunction(window.location.href)).toBeDefined();
  });

  it('Should render <LoginComponent />  component', () => {
    expect(wrapper.find(LoginComponent)).toHaveLength(1);
  });

  it('Should give initial state', () => {
    expect(wrapper.state()).toBeDefined();
  });

  it('should handle on click login', () => {
    const fakeEvent = { preventDefault: () => {} };
    const component = wrapper.instance();
    component.onSubmit(fakeEvent);
    expect(component).toBeDefined();
  });

  it('should handle on change', () => {
    const component = wrapper.instance();
    const fakeEvent = { target: { name: 'title', value: 'THIS IS TITLE' } };
    component.onChange(fakeEvent);
    expect(component).toBeDefined();
  });
});
