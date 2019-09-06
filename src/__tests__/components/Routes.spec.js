import React from 'react';
import { shallow } from 'enzyme';
import Routes from '../../components/Routes';

describe('<Routes />', () => {
  it('should render App component', () => {
    const component = shallow(<Routes />)
    expect(component).toMatchSnapshot();
  });
});
