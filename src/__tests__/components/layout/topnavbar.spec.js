/* eslint-disable import/no-unresolved */
import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import TopNavbar from '../../../components/Layout/TopNavbar.jsx';

const mockStore = configureMockStore();
const store = mockStore({});
describe('<TopNavbar />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <TopNavbar />
      </Provider>,
    );
  });

  it('should render TopNavbar component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
