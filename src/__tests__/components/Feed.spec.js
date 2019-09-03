import React from 'react';
import { mount } from 'enzyme';
import { Feed } from '../../components/Articles/Feed.jsx';

describe('Renders CreateArticleComponent', () => {
  const props = {
    articles: [],
    loading: false,
    getFeed: jest.fn(),
  };

  const localStorage = {
      getItem: (token) => {
          return token;
      }
  }

  const wrapper = mount(
    <Feed {...props} localStorage={localStorage} />,
  );
  it('should render feed component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});