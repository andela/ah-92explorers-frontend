import React from 'react';
import { shallow } from 'enzyme';
import Messages from '../../components/Messages/Messages.jsx';

describe('Renders CreateArticleComponent', () => {
  const props = {
    success: undefined,
    error: undefined,
    file: undefined
  };

  const successProps = {
    success: 'Mars',
    error: undefined,
    file: undefined
  };

  const errorProps = {
    success: undefined,
    error: 'undefined',
    file: undefined
  };

  const fileProps = {
    success: undefined,
    error: undefined,
    file: 'undefined'
  };

  it('should render messages component', () => {
    let wrapper = shallow(
        <Messages {...props} />,
      );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a success component', () => {
    let wrapper = shallow(
        <Messages {...successProps} />,
      );
    expect(wrapper.find('.successBox').length).toBe(1);
  });
  it('should render a error component', () => {
    let wrapper = shallow(
        <Messages {...errorProps} />,
      );
    expect(wrapper.find('.errorBox').length).toBe(1);
  });
  it('should render a file component', () => {
    let wrapper = shallow(
        <Messages {...fileProps} />,
      );
    expect(wrapper.find('.errorBox').length).toBe(1);
  });
});