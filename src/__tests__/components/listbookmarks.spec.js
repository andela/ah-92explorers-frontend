import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { ListBookmark, mapStateToProps } from '../../components/Articles/ListBookmarks';
import { mockStore } from '../../__mocks__/store';
import initialState from '../../redux/initialState';

const props = {
  loading: false,
  history: {},
  getAllBookmarks: jest.fn(),
  removeBookmark: jest.fn(() => Promise.resolve({})),
  bookmarkArticle: jest.fn(),
  deleteBookmark: jest.fn(),
};

describe('bookmark component', () => {
  it('renders without crashing', () => {
    const component = shallow(<ListBookmark {...props} />);
    expect(component).toHaveLength(1);
  });

  it('', () => {
    const component = mount(
      <MemoryRouter>
        <Provider store={mockStore({ ...initialState })}>
          <ListBookmark {...props} />
        </Provider>
      </MemoryRouter>,
    );
    expect(component).toHaveLength(1);
  });
  it('renders bookmark with handleClick', () => {
    const component = shallow(<ListBookmark {...props} />);
    component.instance().handleOnClick()
    expect(component).toHaveLength(1);
  });
  it('renders bookmark with deleteBookmark', () => {
    const component = shallow(<ListBookmark {...props} />);
    component.instance().deleteBookmark()
    expect(component).toHaveLength(1);
  });
  it('should map state to props', () => {
        const initialState = {
            boookMarking: {},
            
        };
        mapStateToProps({...initialState});

        expect(mapStateToProps).toBe(mapStateToProps);

    });
});
