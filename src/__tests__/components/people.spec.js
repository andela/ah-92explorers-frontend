import React from 'react';
import { shallow} from 'enzyme';
import { People } from '../../components/Search/People.jsx';

describe('Renders CreateArticleComponent', () => {
  const props = {
    results: [{ id: 1 }],
    error: null,
    getPeopleResults: jest.fn(),
  };

  const props2 = {
    results: undefined,
    error: null,
    getPeopleResults: jest.fn(),
  }

  const props3 = {
    results: [],
    error: {},
    getPeopleResults: jest.fn(),
  }

  const wrapper = shallow(
    <People {...props} />,
  );

  const wrapper2 = shallow(
    <People {...props2} />,
  );

  const wrapper3 = shallow(
    <People {...props3} />,
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