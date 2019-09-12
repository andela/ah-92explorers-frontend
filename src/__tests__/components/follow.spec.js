import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Follow } from '../../components/Follow/Follow.jsx';
import initialState from '../../redux/initialState';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);

const props = {
  getProfileUser: jest.fn(),
  followOther: jest.fn(),
  viewUser: {
    image: '',
  },
};

describe('testing Follow component', () => {
  test('should render Follow component', () => {
    const wrapper = shallow(<Follow {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  it('', () => {
    const component = mount(
      <MemoryRouter>
        <Provider store={mockStore({...initialState, profile: { profile: {}, viewUser:{} } })}>
          <Follow {...props} />
        </Provider>
      </MemoryRouter>,
    );
    expect(component).toHaveLength(1);
  });

  it('renders Follow component with handleFollowing', () => {
    const component = shallow(<Follow {...props} />);
    component.instance().handleFollowing()
    expect(component).toHaveLength(1);
  });
});
