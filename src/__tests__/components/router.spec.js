import React from 'react';
import { shallow } from 'enzyme';
import Routes from '../../components/Routes';

describe('Route Component', () => {
  it('should render Routes component', () => {
    const component = shallow(<Routes />);
    expect(component).toMatchSnapshot();
  });
});
