import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import initialState from '../redux/initialState';

export const middleWares = [thunk];
export const mockStore = configureMockStore(middleWares);
export default mockStore(initialState);
