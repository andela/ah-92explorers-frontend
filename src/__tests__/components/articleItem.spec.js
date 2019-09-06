import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ArticleReadDelete } from '../../components/Articles/ArticleItem';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
describe('Renders CreateArticleComponent', () => {
  const props = {
      article: {
        fetched: true,
        owner: true,
        article: {
          time: { readTime: '2minutes' },
          title: 'title',
          body: 'body',
          slug: 'slug',
          image: 'image',
          tagList: 'sjdas',
          description: 'dskfdbsf',
        },
      },
      getArticle: jest.fn,
      loading: false,
      getCurrentProfile: jest.fn(),
      profile: { profile: {}},
      match: {
        params: {
          articleSlug: 'jest',
        },
      },
  }

  const props2 = {
    article: {
      fetched: true,
      owner: true,
      article: {
        time: { readTime: '2minutes' },
        title: 'title',
        body: 'body',
        slug: 'slug',
        image: 'image',
        tagList: 'sjdas',
        description: 'dskfdbsf',
      },
    },
    getArticle: jest.fn,
    loading: true,
    getCurrentProfile: jest.fn(),
    profile: {},
    match: {
      params: {
        articleSlug: 'jest',
      },
    },
}
  const wrapper = mount(
    <MemoryRouter>
      <Provider store={mockStore({props})}><ArticleReadDelete {...props} /></Provider>
    </MemoryRouter>
  );

  const wrapper2 = mount(
    <MemoryRouter>
      <Provider store={mockStore({props})}><ArticleReadDelete {...props2} /></Provider>
    </MemoryRouter>
  );
  it('should render create component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render create component', () => {
    expect(wrapper2).toMatchSnapshot();
  });

  it('should render a the body class', () => {
    const btn = wrapper.find('.deleteIcon').first();
    wrapper.setState({modal: true})
    expect(btn.length).toBe(1);
    btn.simulate('click')
    expect(wrapper.find('.theBodyArticle').length).toBe(1);
  });
  it('test update state onchange', () => {
    wrapper.instance().componentDidMount()
    expect(wrapper.instance().props.children.props.children.props.getArticle).toBeDefined();
  });
});