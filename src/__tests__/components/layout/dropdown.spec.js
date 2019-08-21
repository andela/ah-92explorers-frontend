import React from 'react';
import { shallow } from 'enzyme';
import { Dropdown } from '../../../components/Layout/Dropdown.jsx';

const props = {
  displayMenu: false,
  logout: jest.fn(),
  login: { user: { username: 'efefdf' }, isAuthenticated: true },
};
let wrapper;

describe('<Dropdown />', () => {
  beforeAll(() => {
    wrapper = shallow(<Dropdown {...props} />);
  });

  it('should render dropdown component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show dropdown menu', () => {
    const fakeEvent = { preventDefault: () => {} };
    const component = wrapper.instance();
    component.showDropdownMenu(fakeEvent);
    expect(component).toBeDefined();
  });

  it('should hide dropdown menu', () => {
    const component = wrapper.instance();
    component.hideDropdownMenu();
    expect(component).toBeDefined();
  });

  it('should hande logout button ', () => {
    const fakeEvent = { preventDefault: () => {} };
    const component = wrapper.instance();
    component.logout(fakeEvent);
    expect(component).toBeDefined();
  });
});
