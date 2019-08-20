import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import App from '../../components/App';


describe('App Component', () => {
  it('should render App component', () => {
    let component;
    act(() => {
      component = mount(<App />);
    });
    expect(component).toMatchSnapshot();
  });
});
