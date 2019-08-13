import React from 'react';
import { shallow, mount } from 'enzyme';
import { UpdateArticle } from '../../components/Articles/UpdateArticle.jsx';

// mock for mutations observer window object
global.MutationObserver = class {
  constructor(_callback) {}

  disconnect = () => {}

  observe(_element, _initObject) {}
};

describe('Renders CreateArticleComponent', () => {
  const props = {
    article: {
      article: { slug: 'test' },
      message: 'test',
    },
    error: '',
    match: {
      params: {
        articleSlug: 'jest',
      },
    },
    updateArticle: jest.fn(),
    getArticle: jest.fn(),
  };

  const wrapper = mount(
    <UpdateArticle {...props} />,
  );
  it('should render create component', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a mainDiv class', () => {
    expect(wrapper.find('.mainDiv').length).toBe(1);
  });
  it('should render a publishBtn class', () => {
    expect(wrapper.find('.publishBtnArticle').length).toBe(1);
  });
  it('should render a titleContent class', () => {
    expect(wrapper.find('.titleContent').length).toBe(1);
  });
  it('should test componentDidUpdate', () => {
    wrapper.setState({title: 'did i change again'});
    expect(wrapper.instance().props.article.article.slug).toEqual('test');
  })
  it('should publish article on click', () => {
    const btn = wrapper.find('.publishBtnArticle');
    const component = wrapper.instance();
    btn.simulate('click')
    component.onClickPublish();
    expect(component).toBeDefined();
  });
  it('should change state onChange', () => {
    const input = wrapper.find('.titleContent').find('input');
    const event = {
      preventDefault() {},
      event: { value: 'changed it ooops' },
    }
    input.simulate('change', event);
  });
  it('test update state onchange', () => {
    wrapper.instance().componentDidMount()
    expect(wrapper.instance().props.getArticle).toBeCalled();
  });
});
