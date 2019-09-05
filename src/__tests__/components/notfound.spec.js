import '@babel/polyfill';
import React from 'react';
import { shallow } from 'enzyme';
import { NotFound } from '../../components/NotFound/NotFound';

describe('Render NotFound Component', () => {
  it('to have wrapper class', async () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
