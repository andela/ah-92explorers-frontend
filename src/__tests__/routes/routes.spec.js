import React from 'react';
import { shallow } from 'enzyme';
import Router from '../../components/Routes';

describe('<Router />', () => {
  it('should render routes', () => {
    const component = shallow(<Router />);
    expect(component).toMatchSnapshot();
  });
});
