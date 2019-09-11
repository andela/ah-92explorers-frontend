import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  opt,
} from '../../redux/actions/actionCreators/profile';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('notification action', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should opt in user into notifications', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        data: {
          "user": "successfully unsubscribed to email notifications",
          "opted": true,
      }
      });
    });

    return store.dispatch(opt()).then(() => {
      console.log(store.getActions());
      expect(store.getActions().length).toBe(1);
    });
  });
});
