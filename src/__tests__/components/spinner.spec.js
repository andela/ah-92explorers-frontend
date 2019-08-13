import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../components/Spinner/Spinner.jsx';

describe('Renders CreateArticleComponent', () => {
  const wrapper = shallow(
    <Spinner />,
  );
  it('should render create component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a mainDiv class', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
});
