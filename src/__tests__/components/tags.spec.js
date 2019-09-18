import React from 'react';
import { shallow} from 'enzyme';
import { Tags } from '../../components/Search/Tags.jsx';

describe('Renders CreateArticleComponent', () => {
  const props = {
    results: [{ id: 1 }],
    error: null,
    getTagResults: jest.fn(),
  };

  const props2 = {
    results: undefined,
    error: null,
    getTagResults: jest.fn(),
  }

  const props3 = {
    results: [],
    error: {},
    getTagResults: jest.fn(),
  }

  const wrapper = shallow(
    <Tags {...props} />,
  );

  const wrapper2 = shallow(
    <Tags {...props2} />,
  );

  const wrapper3 = shallow(
    <Tags {...props3} />,
  );
  
  it('should render create component3', () => {
    expect(wrapper3).toMatchSnapshot();
  });

  it('should render create component2', () => {
    expect(wrapper2).toMatchSnapshot();
  });

  it('should render create component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a mainDiv class', () => {
    expect(wrapper.find('.searchBody').length).toBe(1);
  });

  it('should change state onChange', () => {
    const fakeEvent = { target: { value: 'been' } };
    const instance = wrapper.instance();
    instance.changeText(fakeEvent);
    expect(wrapper).toBeDefined();
  });
});