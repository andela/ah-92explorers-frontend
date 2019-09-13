/* eslint-disable import/no-unresolved */
import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Navbar } from '../../../components/Layout/navBar';

const mockStore = configureMockStore();
const store = mockStore({});
describe('<Navbar />', () => {
  const props = {
    notifications: {
      notifications: {
          allNotification: []
      },
    },
    getNotifications: jest.fn(),
    readNotification: jest.fn(),
  }
  const wrapper = shallow(
      <Navbar {...props}/>
  );
  it('should render Navbar component', () => {
    const li = wrapper.find('ListGroupItem').first();
    expect(wrapper).toMatchSnapshot();
  });
  
  it('test update state onchange', () => {
    wrapper.instance().componentDidMount()
    expect(wrapper.instance().props.getNotifications).toBeCalled();
  });

  it('shoudl handle on comment', () => {
    const component = wrapper.instance();
    component.onclickNotif({ target: { getAttribute: jest.fn()}});
    component.refresh();
    component.onHandleClick();
    component.handleMouseLeave();
    component.toggle2()
    component.viewmore();
    expect(component).toBeDefined();
  });
});
