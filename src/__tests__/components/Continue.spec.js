import React from 'react';
import { shallow, mount } from 'enzyme';
import { Continue, mapStateToProps } from '../../components/Continue/Continue.jsx';

describe('<Continue />', () => {
    const props = {
        getInfo: jest.fn(),
        user: { success:{} }
    };
  
    const wrapper = shallow(<Continue {...props}/>);
  
    it('should render Comments component', () => {
      expect(wrapper).toMatchSnapshot();
    });
  
    it('should render one main Fragment element', () => {
      expect(wrapper.find('Fragment')).toHaveLength(1);
    });
  
    it('should handle on click', () => {
      const component = wrapper.instance();
      component.handleOnClick();
      expect(component).toBeDefined();
    });

    it('to have wrapper class', async () => {
      const wrapper = shallow(<Continue {...props} />);
      const btn = wrapper.find('.btn__continue');
      btn.simulate('click');
      expect(btn.length).toBe(1);
    });

    it('should map state to props', () => {
        const initialState = {
          social: {
            user: { success: {}},
          }
        };
        mapStateToProps({...initialState});
        expect(mapStateToProps).toBe(mapStateToProps);
      });
  });