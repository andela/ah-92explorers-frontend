import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Feed } from '../../components/Articles/Feed.jsx';

describe('Renders CreateArticleComponent', () => {
  const props = {
    articles: [{articles: 1}, {articles: 1}, {articles: 1}, {articles: 1}, {articles: 1},
      {articles: 1}, {articles: 1}, {articles: 1}, {articles: 1}, {articles: 1},
      {articles: 1}, {articles: 1}, {articles: 1}, {articles: 1}, {articles: 1}
    ],
    loading: false,
    history: {},
    getFeed: jest.fn(),
  };

  const localStorage = {
      getItem: (token) => {
          return token;
      }
  }

  function createNodeMock(element) {
    if (element.type === 'input') {
      return {
        focus() {},
      };
    }
    return null;
  }

  const wrapper = shallow(<Feed {...props} />);
  it('should render feed component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render div', () => {
    expect(wrapper.find('div').length).toBe(53);
  });

  it('should call wrapper .changePage', () => {
    const fakeEvent = { target: { value: 1 } };
    const instance = wrapper.instance();
    instance.changePage(fakeEvent);
    expect(wrapper).toBeDefined();
  });

  it('should change page Numbers', () => {
    const instance = wrapper.instance();
    instance.changePaginationLeft();
    expect(wrapper).toBeDefined();
  });

  it('should change to last page', () => {
    const fakeEvent = { target: { value: 7 } };
    const instance = wrapper.instance();
    instance.toLastPage(fakeEvent);
    expect(wrapper).toBeDefined();
  });
});