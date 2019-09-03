import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App.jsx';

describe('App Component', () => {
  it('should render App component', () => {
    const component = shallow(<App />)
    expect(component).toMatchSnapshot();
  });
});
