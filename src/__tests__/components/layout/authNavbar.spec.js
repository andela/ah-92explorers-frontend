import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../../../components/Layout/Navbar.jsx';


describe('<Navbar />', () => {
  const props = {
    token: 'something', 
    username: 'username',
    avatar: 'avatar'
  };

  const secondProps = {
    token: undefined, 
    username: 'username',
    avatar: 'avatar'
  };
  it('should render Navbar component', () => {
    let wrapper = shallow(
        <Navbar {...props} />,
      );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Navbar component', () => {
    let wrapper = shallow(
        <Navbar {...secondProps} />,
      );
      expect(wrapper.find('.feedNavbar').length).toBe(1);
  });
});
