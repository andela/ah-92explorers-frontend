import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import RatingsModal from '../../components/Articles/Rating/RatingsModal';


describe('App', () => {
  let app;
  beforeEach(() => {
    app = shallow(<RatingsModal />);
  });

  it('renders successfully', () => {
    expect(app).toBeDefined();
  });

  it('renders a div', () => {
    expect(app.find('div').length).toBe(2);
  });

  it('renders StarRatingComponent', () => {
    expect(app.find('StarRatingComponent').length).toBe(1);
  });
});
