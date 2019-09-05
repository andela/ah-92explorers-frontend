import React from 'react';
import { shallow } from 'enzyme';
import { Feed } from '../../components/Articles/Feed.jsx';

describe('Renders CreateArticleComponent', () => {
  const props = {
    articles: [{articles: 1}, {articles: 1}, {articles: 1}, {articles: 1}, {articles: 1},
      {articles: 1}, {articles: 1}, {articles: 1}, {articles: 1}, {articles: 1},
      {articles: 1}, {articles: 1}, {articles: 1}, {articles: 1}, {articles: 1}
    ],
    loading: false,
    history: {},
    bookmarks: [],
    getFeed: jest.fn(),
    getAllBookmarks: jest.fn(),
    bookmarkArticle: jest.fn(),
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

  it('should change page Numbers', () => {
    const instance = wrapper.instance();
    instance.changePaginationRight();
    expect(wrapper).toBeDefined();
  });

  it('should call wrapper .changePage', () => {
    const fakeEvent = { target: { value: 1 } };
    const instance = wrapper.instance();
    instance.checkPage(fakeEvent);
    expect(wrapper).toBeDefined();
  });

  it('should change to last page', () => {
    const fakeEvent = { target: { value: 7 } };
    const instance = wrapper.instance();
    instance.toLastPage(fakeEvent);
    expect(wrapper).toBeDefined();
  });

  it('renders Feed component with componentDidMount', () => {
    const component = shallow(<Feed {...props} />);
    component.instance().componentDidMount()
    expect(component).toHaveLength(1);
  });

  it('renders Feed component with componentDidUpdate', () => {
    const component = shallow(<Feed {...props} />);
    component.instance().componentDidUpdate()
    expect(component).toHaveLength(1);
  });

  it('renders Feed component with checkPage', () => {
    const component = shallow(<Feed {...props} />);
    component.instance().checkPage({target: { value: 7 } });
    expect(component).toHaveLength(1);
  });

  it('renders Feed component with changePaginationRight', () => {
    const component = shallow(<Feed {...props} />);
    component.instance().changePaginationRight()
    expect(component).toHaveLength(1);
  });
  
  it('renders bookmark with handleClick', () => {
    const component = shallow(<Feed {...props} />);
    component.instance().handleClick()
    expect(component).toHaveLength(1);
  });
  it('to have wrapper class', async () => {
    const wrapper = shallow(<Feed {
              ...props
            }
    />);
    const btn = wrapper.find('.prof1');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });
  it('to have wrapper class', async () => {
    const wrapper = shallow(<Feed {
              ...props
            }
    />);
    const btn = wrapper.find('.prof2');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });
  it('to have wrapper class', async () => {
    const wrapper = shallow(<Feed {
              ...props
            }
    />);
    const btn = wrapper.find('.prof3');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });
  it('to have wrapper class', async () => {
    const wrapper = shallow(<Feed {
              ...props
            }
    />);
    const btn = wrapper.find('.prof4');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });
  it('to have wrapper class', async () => {
    const wrapper = shallow(<Feed {
              ...props
            }
    />);
    const btn = wrapper.find('.prof5');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });
  it('to have wrapper class', async () => {
    const wrapper = shallow(<Feed {
              ...props
            }
    />);
    const btn = wrapper.find('.prof6');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });
  it('to have wrapper class', async () => {
    const wrapper = shallow(<Feed {
              ...props
            }
    />);
    const btn = wrapper.find('.prof7');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });
  it('to have wrapper class', async () => {
    const wrapper = shallow(<Feed {
              ...props
            }
    />);
    const btn = wrapper.find('.prof8');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });
  it('to have wrapper class', async () => {
    const wrapper = shallow(<Feed {
              ...props
            }
    />);
    const btn = wrapper.find('.prof9');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });
  it('to have wrapper class', async () => {
    const wrapper = shallow(<Feed {
              ...props
            }
    />);
    const btn = wrapper.find('.prof10');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });
  it('to have wrapper class', async () => {
    const wrapper = shallow(<Feed {
              ...props
            }
    />);
    const btn = wrapper.find('.prof11');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });
  it('to have wrapper class', async () => {
    const wrapper = shallow(<Feed {
              ...props
            }
    />);
    const btn = wrapper.find('.prof12');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });
  it('to have wrapper class', async () => {
    const wrapper = shallow(<Feed {
              ...props
            }
    />);
    const btn = wrapper.find('.prof13');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });
});
