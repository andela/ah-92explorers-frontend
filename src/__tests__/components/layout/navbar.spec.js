/* eslint-disable import/no-unresolved */
import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Navbar from '../../../components/Layout/navBar';

const mockStore = configureMockStore();
const store = mockStore({});
describe('<Navbar />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    );
  });

  it('should render Navbar component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
