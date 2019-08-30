import React from 'react';
import { shallow, mount } from 'enzyme';
import { ArticleItem } from '../../components/Articles/ArticleItem.jsx';

describe('Renders CreateArticleComponent', () => {
  const props = {
      article: {},
      getArticle: jest.fn,
      loading: false,
      match: {
        params: {
          articleSlug: 'jest',
        },
      },
  }

  const props2 = {
    article: {},
    getArticle: jest.fn,
    loading: true,
    match: {
      params: {
        articleSlug: 'jest',
      },
    },
}
  const wrapper = mount(
    <ArticleItem {...props} />,
  );

  const wrapper2 = mount(
    <ArticleItem {...props2} />,
  );
  it('should render create component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render create component', () => {
    expect(wrapper2).toMatchSnapshot();
  });

  it('should render a mainDiv class', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
  it('test update state onchange', () => {
    wrapper.instance().componentDidMount()
    expect(wrapper.instance().props.getArticle).toBeDefined();
  });
});