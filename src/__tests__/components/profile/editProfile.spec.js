import React from 'react';
import {
  mount,
  shallow,
} from 'enzyme';
import {
  Provider,
} from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  EditProfile,
} from '../../../components/Profile/EditProfile';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const props = {
  getCurrentProfile: jest.fn(),
  updateProfile: jest.fn(),
  following: jest.fn(), 
  followers: jest.fn(),
  profile: {},
  history: {},
};

describe('Render EditProfile component', () => {
  it('should render Edit component', () => {
    const wrapper = shallow(<EditProfile store={store} {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('to have wrapper class', async () => {
    const wrapper = shallow(<EditProfile {
              ...props
            }
    />);
    const btn = wrapper.find('.updateBtn1');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });
  it('EditProfile input fields', async () => {
    const wrapper = shallow(<EditProfile {
      ...props
    }
    />);
    const inputs = wrapper.find('input');
    const correctInputs = {
      username: 'isaiah',
      firstName: 'runoro',
      lastName: 'isaie',
      phone: '+250788767676',
      location: 'gisozi',
      facebook: 'facebook.com/isaie',
      instagram: 'instagram.com/doe',
      linkedIn: 'linkedin.com/isaieDoe',
      twitter: 'twitter.com/isaiah',
      bio: 'My bio',
    };

    inputs.map(input => input.simulate('change', {
      target: {
        name: input.getElement().props.name,
        value: correctInputs[input.getElement().props.name],
      },
    }));
  });

  describe('EditProfile component', () => {
    const component = shallow(<EditProfile {...props} />);
    component.setState({ fileImg: '' });

    it('should call handleFiles method when the is uploaded', () => {
      const spy = jest.spyOn(component.instance(), 'handleFiles');
      const imageFile = component.find('ReactFileReader');
      const instance = component.instance();
      const expected = { fileList: ['image'] };
      instance.handleFiles(expected);
      expect(imageFile.length).toBe(1);
      expect(component.state('file')).toBe(expected);
      expect(spy).toBeDefined();
    });

    it('should call componentWillReceiveProps', () => {
      const profile = {
        username: 'isaiah',
        firstName: 'runoro',
        lastName: 'isaie',
        phone: '+250788767676',
        location: 'gisozi',
        facebook: 'facebook.com/isaie',
        instagram: 'instagram.com/doe',
        linkedIn: 'linkedin.com/isaieDoe',
        twitter: 'twitter.com/isaiah',
        bio: 'My bio',
        image: 'image',
      };
      component.setProps({ profile });
      const { propps } = component.instance();
    });
  });
});
