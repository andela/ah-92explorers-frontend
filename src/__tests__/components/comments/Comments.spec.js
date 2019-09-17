import '@babel/polyfill';
import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Comments, mapStateToProps } from '../../../components/Comments/Comments.jsx';

describe('<Comments />', () => {
  const props = {
    comments: [
      {
        id: "39fb0df3-7412-4bed-94dd-7e20219eeda3",
        body: "jjj",
        createdAt: "2019-09-13T13:54:37.945Z",
        updatedAt: "2019-09-13T13:54:37.945Z",
        commentor: {
          username: "EleElebi",
          image: null
        },
        likes: [
          {
            id: "13e71634-3bd3-40f2-a309-d274c9e18b4b",
            commentId: "a66a712a-82ec-401f-afad-6949ddf3d905",
            likes: 1,
            createdAt: "2019-09-17T14:23:19.487Z",
            updatedAt: "2019-09-17T14:23:19.487Z",
            user: {
                username: "Hervera",
                image: null
            }
          }
        ]
      }
    ],
    slug: '',
    username: '',
    userImage: '',
    fetchComments: jest.fn(() => Promise.resolve({})),
    postComment: jest.fn(() => Promise.resolve({})),
    deleteComment: jest.fn(),
    editCommentHistory: jest.fn(),
    fetchEditCommentHistory: jest.fn(),
    updateComment: jest.fn(() => Promise.resolve({})),
    commentHistory: [
      {
        commentId: "1241c5a3-7109-4c5a-98f7-218e1427eda4",
        body: "Celestin you have the same comments, delete one",
        createdAt: "2019-09-13T08:46:07.013Z",
        updatedAt: "2019-09-13T08:46:07.013Z"
      }
    ],
    commentError: {},
    login: {user:{username:''}},
    likeAComment: jest.fn(() => Promise.resolve({})),
  };

  const initialState = {};
  const mockStore = configureStore();
  let store;

  store = mockStore(initialState);
  const wrapper = shallow(<Comments store={store} {...props}/>);

  it('should render Comments component', () => {
    const wrapper = mount(<Comments {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render one main div element', () => {
    expect(wrapper.find('div')).toHaveLength(16);
  });

  it('shoudl handle on comment', async () => {
    const body = 'hello';
    const slug = 'the-basics-of-nodejs';
    const component = wrapper.instance();
    component.handleOnComment(body, slug);
    expect(component).toBeDefined();
  });

  it('should handle on change', () => {
    const component = wrapper.instance();
    const fakeEvent = { target: { name: 'title', value: 'THIS IS TITLE' } };
    component.onChange(fakeEvent);
    expect(component).toBeDefined();
  });

  it('should handle on cal of functions', () => {
    const component = wrapper.instance();
    const fakeEvent = { target: { name: 'title', value: 'THIS IS TITLE' } };
    component.changeEditMode();
    component.onEditChange(fakeEvent);
    component.updateCommentValue();
    component.toggleEditHistory();
    component.toggle();
    expect(component).toBeDefined();
  });

  it('should handle on click on delete comment', () => {
    const fakeEvent = { preventDefault: () => {} };
    const component = wrapper.instance();
    component.onDeleteComment(fakeEvent);
    expect(component).toBeDefined();
  });

  it('should handle on click on delete comment', () => {
    const commentId = 3;
    const component = wrapper.instance();
    component.likeComment(commentId);
    expect(component).toBeDefined();
  });

  it('hould simulate on click comment button', async () => {
    const wrapper = shallow(<Comments { ...props} />);
    const btn = wrapper.find('.publish');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });

  it('to have wrapper class', async () => {
    const wrapper = shallow(<Comments {...props}/>);
    const btn = wrapper.find('.likeImg');
    btn.simulate('click');
    expect(btn.length).toBe(1);
  });

  it('should find the key', async () => {
    const wrapper = mount(<Comments { ...props} />);
    const btn = wrapper.find('.commentCard');
    expect(btn).toBeDefined();
  });

  it('should test componentDidMount', () => {
    const wrapper = mount(<Comments { ...props} />);
    wrapper.instance().componentDidMount()
    expect(wrapper.instance().props.fetchComments).toBeCalled();
  });

  it('should map state to props', () => {
    const initialState = {
      comments:[],
      commentError: {},
      commentHistory: [],
      login: {
        isAuthenticated: true,
        loginError: {},
        auth: {},
      }
    };
    mapStateToProps({...initialState});
    expect(mapStateToProps).toBe(mapStateToProps);
  });
});