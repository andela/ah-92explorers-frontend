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
  following: jest.fn(),
  followers: jest.fn(),
  followOther: ()=>Promise.resolve({username:"celestin"}),
  componentWillReceiveProps: jest.fn(),
  opt: jest.fn(),
  profile: {
    image: '',
  },
};

describe('viewProfile component', () => {
  it('renders without crashing', () => {
    const component = shallow(<ViewProfileComponent {...props} />);
    const component2 = component.instance();
    expect(component).toHaveLength(1);
  });

  it(' It should render the states', () => {
    const component = mount(
      <MemoryRouter>
        <Provider store={mockStore({ ...initialState, profile: { profile: {}}, follow:{ follow:{}}  })}>
          <ViewProfile {...props} />
        </Provider>
      </MemoryRouter>,
    );
    expect(component).toHaveLength(1);
  });

  it('renders viewProfile component with the thefollowingUsers Props', () => {
    const component = shallow(<ViewProfileComponent {...props} />);
    component.instance().componentWillReceiveProps({thefollowingUsers:[{username:'karasira',image:null}],thefollowerUsers:[{username:'karasira',image:null}]})
    expect(component).toHaveLength(1);
  });

  it('renders viewProfile component with the thefollowerUsers Props', () => {
    const component = shallow(<ViewProfileComponent {...props} />);
    component.instance().componentWillReceiveProps({thefollowingUsers:[{username:'karasira',image:null}],thefollowerUsers:[{username:'karasira',image:null}]})
    expect(component).toHaveLength(1);
  });

  it('renders viewProfile with followerToggle', () => {
    const component = shallow(<ViewProfileComponent {...props} />);
    component.instance().followerToggle()
    expect(component).toHaveLength(1);
  });

  it('renders viewProfile with followingToggle', () => {
    const component = shallow(<ViewProfileComponent {...props} />);
    component.instance().followingToggle()
    expect(component).toHaveLength(1);
  });

  it('renders viewProfile with handleFollowing ', () => {
    const component = shallow(<ViewProfileComponent {...props} />);
    component.instance().handleFollowing()
    expect(component).toHaveLength(1);
  });
});
