import '@babel/polyfill';
import React from 'react';
import { shallow, mount} from 'enzyme';
import { ShareArticle } from '../../components/Articles/ShareArticle.jsx';

describe('<ShareArticle />', () => {
  let wrapper;

  const props = {
    fetched: '',
    article: '',
  };

  beforeEach(() => {
    wrapper = shallow(<ShareArticle {...props} />);
  });

  it('should render Login component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('shoudl handle on comment', () => {
    const wrapper = shallow(
      <ShareArticle {...props} />,
    );
    const component = wrapper.instance();
    component.shareSocial();
    expect(component).toBeDefined();
  });

  it('hould simulate on click facebook icon', async () => {
    const btn = wrapper.find('.fb');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });

  it('hould simulate on click twitter icon', async () => {
    const btn = wrapper.find('.tw');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });

  it('hould simulate on click mail icon', async () => {
    const btn = wrapper.find('.gp');
    btn.simulate('click', { preventDefault: jest.fn() });
    expect(btn.length).toBe(1);
  });
});
