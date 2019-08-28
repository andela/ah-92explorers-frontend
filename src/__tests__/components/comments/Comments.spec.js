import '@babel/polyfill';
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Comments } from '../../../components/Comments/Comments.jsx';

describe('<Comments />', () => {
  const props = {
    comments: [],
    slug: '',
    username: '',
    userImage: '',
    body: '',
    fetchComments: () => jest.fn(),
    postComment: async () => {},
    deleteComment: () => jest.fn(),
  };

  const initialState = {};
  const mockStore = configureStore();
  let store;

  store = mockStore(initialState);
  const wrapper = mount(<Comments store={store} {...props}/>);

  it('should render Comments component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render one main div element', () => {
    expect(wrapper.find('div')).toHaveLength(5);
  });

  it('shoudl handle on comment', async () => {
    const fakeEvent = { preventDefault: () => {} };
    const component = wrapper.instance();
    component.handleOnComment(fakeEvent);
    expect(component).toBeDefined();
  });

  it('should handle on change', () => {
    const component = wrapper.instance();
    const fakeEvent = { target: { name: 'title', value: 'THIS IS TITLE' } };
    component.onChange(fakeEvent);
    expect(component).toBeDefined();
  });

  it('should handle on click on delete comment', () => {
    const fakeEvent = { preventDefault: () => {} };
    const component = wrapper.instance();
    component.onDeleteComment(fakeEvent);
    expect(component).toBeDefined();
  });

  it('hould simulate on click comment button', async () => {
    const wrapper = shallow(<Comments { ...props} />);
    const btn = wrapper.find('.publish');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });

  it('should find the key', async () => {
    const wrapper = mount(<Comments { ...props} />);
    const btn = wrapper.find('.commentCard');
    expect(btn).toBeDefined();
  });
});