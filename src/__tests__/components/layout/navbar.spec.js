import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../../../components/Layout/Navbar';


describe('<Navbar />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Navbar />);
  });

  it('should render Navbar component', () => {
    expect(wrapper).toMatchSnapshot();
  });

//   it('should render two <Input /> elements', () => {
//     const component = setup();
//     const logo = component.find('.logo');
//     expect(logo.length).toBe(1);
//   });
});
