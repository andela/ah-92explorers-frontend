import React from 'react';
import { shallow } from 'enzyme';
import AuthNavbar from '../../../components/Layout/AuthNavbar.jsx';


describe('<AuthNavbar />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AuthNavbar />);
  });

  it('should render AuthNavbar component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
