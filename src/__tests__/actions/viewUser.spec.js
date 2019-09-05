import moxios from 'moxios';
import dotenv from 'dotenv';
import store from '../../__mocks__/store';
import * as viewUser from '../../redux/actions/actionCreators/viewUser';
dotenv.config();

describe('follow action', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should not view user to follow', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: { message: 'successful unfollow isaiah' },
      });
    });
    return store.dispatch(viewUser.getProfileUser()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
});
