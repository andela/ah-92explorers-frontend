import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Home from '../../components/Home';


const initialState = {};

// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();
let wrapper;
let store;


const props = {
  login: {},
};

describe('<Home />', () => {
  beforeEach(() => {
    // creates the store with any initial state or middleware needed
    store = mockStore(initialState);
    wrapper = shallow(<Home store={store} {...props} />);
  });

  it('should render Login component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
