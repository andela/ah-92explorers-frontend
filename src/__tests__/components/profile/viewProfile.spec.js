import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import ViewProfile, { ViewProfile as ViewProfileComponent } from '../../../components/Profile/ViewProfile';
import { mockStore } from '../../../__mocks__/store';
import initialState from '../../../redux/initialState';

const props = {
  loading: false,
  getCurrentProfile: jest.fn(),
  profile: {
    image: '',
  },
};

describe('viewProfile component', () => {
  it('renders without crashing', () => {
    const component = shallow(<ViewProfileComponent {...props} />);
    expect(component).toHaveLength(1);
  });

  it('', () => {
    const component = mount(
      <MemoryRouter>
        <Provider store={mockStore({ ...initialState, profile: { profile: {} } })}>
          <ViewProfile {...props} />
        </Provider>
      </MemoryRouter>,
    );
    expect(component).toHaveLength(1);
  });
});
