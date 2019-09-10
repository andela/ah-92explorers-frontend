import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ViewMore } from '../../components/ViewMore/ViewMore';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
describe('Renders CreateArticleComponent', () => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');
    window.localStorage.__proto__.setItem = jest.fn();
    window.localStorage.setItem('authenticated', true);
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
        <ViewMore {...props}/>
    );
    it('should render ViewMore component', () => {
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
      expect(component).toBeDefined();
    });
});
