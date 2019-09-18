import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import ReadingStats, { ReadingStats as ReadingStatsComponent } from '../../components/Articles/ReadingStats.jsx';
import { mockStore } from '../../__mocks__/store';
import initialState from '../..//redux/initialState';

const props = {
  loading: false,
  readingStats: jest.fn(),
  componentWillReceiveProps: jest.fn(),
  profile: {
    image: '',
  },
};

describe('readingStats component', () => {
  it('renders without crashing', () => {
    const component = shallow(<ReadingStatsComponent {...props} />);
    expect(component).toHaveLength(1);
  });

  it(' It should render the states', () => {
    const component = mount(
      <MemoryRouter>
        <Provider store={mockStore({ ...initialState, profile: { profile: {}} })}>
          <ReadingStats {...props} />
        </Provider>
      </MemoryRouter>,
    );
    expect(component).toHaveLength(1);
  });

  it('renders readingStats component with the componentWillReceiveProps', () => {
    const component = shallow(<ReadingStatsComponent {...props} />);
    component.instance().componentWillReceiveProps({theReadingStats:[{totalArticleRead:'2', article:{title:'Hello World'}}]})
    expect(component).toHaveLength(1);
  });

  it('renders readingStats with componentDidMount', () => {
    const component = shallow(<ReadingStatsComponent {...props} />);
    component.instance().componentDidMount()
    expect(component).toHaveLength(1);
  });
});
