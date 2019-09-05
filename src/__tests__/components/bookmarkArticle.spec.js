import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import ViewProfile, { ViewProfile as ViewProfileComponent } from '../../components/Profile/ViewProfile';
import { BookmarkArticle } from '../../components/Articles/BookmarkArticle';
import { mockStore } from '../../__mocks__/store';
import initialState from '../../redux/initialState';

const props = {
  article: {
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
  loading: false,
  getAllBookmarks: jest.fn(),
  bookmarkArticle: jest.fn(),
  bookmarks: 'bookmark errors',
};

describe('bookmark component', () => {
  it('renders without crashing', () => {
    const component = shallow(<BookmarkArticle {...props} />);
    expect(component).toHaveLength(1);
  });

  it('', () => {
    const component = mount(
      <MemoryRouter>
        <Provider store={mockStore({ ...initialState })}>
          <BookmarkArticle {...props} />
        </Provider>
      </MemoryRouter>,
    );
    expect(component).toHaveLength(1);
  });
  it('renders bookmark with handleClick', () => {
    const component = shallow(<BookmarkArticle {...props} />);
    component.instance().handleClick()
    expect(component).toHaveLength(1);
  });
});
