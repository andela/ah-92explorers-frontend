import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Alert from '../../../components/Layout/Alert';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
describe('<Alert />', () => {
  const props = {
    alerts: [{Math: 'ls'}]
  };
  it('should render Navbar component', () => {
    const wrapper = shallow(
        <Provider store={store}>
            <Alert {...props} />,
        </Provider>
      );
    expect(wrapper).toMatchSnapshot();
  });

});