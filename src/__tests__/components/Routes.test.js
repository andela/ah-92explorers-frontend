import React from 'react';
import { shallow } from 'enzyme';
import Routes from '../../components/Routes';

describe('<Routes />', () => {
  it('renders without crashing', () => {
    expect(() => shallow(<Routes />)).not.toThrow();
  });
});
