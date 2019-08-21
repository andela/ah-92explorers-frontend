import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';

describe('<App />', () => {
  it('renders without crashing', () => {
    expect(() => shallow(<App />)).not.toThrow();
  });
});
