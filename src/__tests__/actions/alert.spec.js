import moxios from 'moxios';
import dotenv from 'dotenv';
import store from '../../__mocks__/store';
import * as alert from '../../redux/actions/actionCreators/alert';
dotenv.config();

describe('Alert action', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should view alert', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
      });
    });
    return store.dispatch(alert.setAlert())
  });
});
