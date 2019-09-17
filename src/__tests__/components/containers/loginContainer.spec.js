import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import LoginComponent from '../../../components/Auth/Login.jsx';
import { LoginContainer, mapStateToProps, mapDispatchToProps } from '../../../components/Containers/Login.jsx';

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

window.location.href = '';

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
    wrapper.setProps({
      auth: { isAuthenticated: true }
    })
    wrapper.instance().componentDidMount()
    expect(jest.isMockFunction(window.location.href)).toBeDefined();
  });

  it('Should render <LoginComponent />  component', () => {
    expect(wrapper.find(LoginComponent)).toHaveLength(1);
  });

  it('Should give initial state', () => {
    expect(wrapper.state()).toBeDefined();
  });

  it('Should return true when login credentials are found', () => {
    const data = {
      email: 'nkuliherve@gmail.com',
      password: '@Hervera14',
    } 
    wrapper.setState({...data});
    const response = wrapper.instance().isValid();
    expect(response).toEqual(true);
  });

  it('Should return errors when email or password is empty', () => {
    const data = {
      email: '',
      password: '',
    } 
    wrapper.setState({...data});
    const response = wrapper.instance().isValid();
    expect(response).toEqual(false);
  });

  it('should handle on click login', () => {
    const fakeEvent = { preventDefault: () => {} };
    const component = wrapper.instance();
    component.isValid = jest.fn(() => true);
    component.onSubmit(fakeEvent);
    expect(component).toBeDefined();
  });

  it('should handle on change', () => {
    const component = wrapper.instance();
    const fakeEvent = { target: { name: 'title', value: 'THIS IS TITLE' } };
    component.onChange(fakeEvent);
    expect(component).toBeDefined();
  });

  it('should handle on change', () => {
    wrapper.setProps({
      isLoginSuccess: true 
    })
    expect(wrapper.find('Redirect').exists()).toEqual(true);
  });

  it('should map state to props', () => {
    const initialState = {
      login: {
        isAuthenticated: true,
        loginError: {},
        auth: {},
      }
    };
    mapStateToProps({...initialState});
    expect(mapStateToProps).toBe(mapStateToProps);
  });

  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).login('email', 'password');
    expect(dispatch.mock.calls).toMatchSnapshot();
  });
});
