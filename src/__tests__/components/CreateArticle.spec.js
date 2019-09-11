import React from 'react';
import { mount, shallow } from 'enzyme';
import { CreateArticle } from '../../components/Articles/CreateArticle.jsx';

// mock for mutations observer window object
global.MutationObserver = class {
  constructor(_callback) {}

  disconnect = () => {}

  observe(_element, _initObject) {}
};

describe('Renders CreateArticleComponent', () => {
  const props = {
    article: {
      article: { slug: 'test', tagList: ['Tag'] },
      message: 'test',
    },
    title: '<h1>Write my name</h1>',
    body: '<p>What did we have for lunch</p>',
    error: '',
    publishArticle: jest.fn(),
  };

  const wrapper = shallow(
    <CreateArticle {...props} />,
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
  it('should render componentOnUpdate', () => {
    wrapper.setState({title: 'did i change'});
    expect(wrapper.instance().props.article.article.slug).toEqual('test');
  });
  it('should change state enterTag', () => {
    const fakeEvent = { target: { value: 'name' } };
    const instance = wrapper.instance();
    instance.enterTags(fakeEvent);
    expect(wrapper).toBeDefined();
  });

  it('should change state enterTag', () => {
    const fakeEvent = { key: 'Enter', target: { value: 'name' } };
    const instance = wrapper.instance();
    instance.showTag(fakeEvent);
    expect(wrapper).toBeDefined();
  });

  it('should change state enterTag', () => {
    const fakeEvent = { key: 'Enter', target: { value: 'name' } };
    const instance = wrapper.instance();
    instance.removeTag(fakeEvent);
    expect(wrapper).toBeDefined();
  });

  it('should publish article on click', () => {
    const btn = wrapper.find('.publishBtnArticle');
    const component = wrapper.instance();
    btn.simulate('click')
    component.onClickPublish();
    expect(component).toBeDefined();
  });
  it('should change state onChange', () => {
    const fakeEvent = { target: { value: 7 } };
    const instance = wrapper.instance();
    instance.signOut();
    expect(wrapper).toBeDefined();
  });
});
