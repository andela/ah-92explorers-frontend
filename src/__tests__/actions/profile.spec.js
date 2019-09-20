import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getCurrentProfile,
  updateProfile,
  opt,
  readingStats,
  following,
  followers,
} from '../../redux/actions/actionCreators/profile';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('profile action', () => {
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
      expect(store.getActions().length).toBe(1);
    });
  });
  it('should get current user profile', () => {
    localStorage.setItem('token', 'token');
    const expectedResponse = {
      username: 'isaiah',
      firstName: 'runoro',
      lastName: 'isaie',
      phone: '+250788767676',
      location: 'gisozi',
      facebook: 'facebook.com/isaie',
      instagram: 'instagram.com/doe',
      linkedIn: 'linkedin.com/isaieDoe',
      twitter: 'twitter.com/isaiah',
      bio: 'My bio',
      image: 'image',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse,
      });
    });

    return store.dispatch(getCurrentProfile()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should not get current user profile when no token provided', () => {
    const expectedResponse = {
      error: 'unthorized',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: expectedResponse,
      });
    });

    return store.dispatch(getCurrentProfile()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });
  it('should update profile', () => {
    const expectedResponse = {
      status: 200,
      message: 'success',
    };

    const formData = {
      username: 'isaiah',
      firstName: 'runoro',
      lastName: 'isaie',
      phone: '+250788767676',
      location: 'gisozi',
      facebook: 'facebook.com/isaie',
      instagram: 'instagram.com/doe',
      linkedIn: 'linkedin.com/isaieDoe',
      twitter: 'twitter.com/isaiah',
      bio: 'My bio',
      image: 'image',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse,
      });
    });

    return store.dispatch(updateProfile(formData)).then(() => {
      expect(store.getActions().length).toBe(0);
    });
  });

  it('should not update profile', () => {
    const expectedResponse = {
      status: 400,
      error: 'error',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedResponse,
      });
    });

    return store.dispatch(updateProfile('')).then(() => {
    });
  });

  it('should view the following', () => {
    const expectedResponse = {
      status: 200,
      payload: {message: 'successful view the following'},
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse,
      });
    });

    return store.dispatch(following()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should not view the following', () => {
    const expectedResponse = {
      status: 400,
      error: 'error',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedResponse,
      });
    });

    return store.dispatch(following()).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });


  it('should view the followers', () => {
    const expectedResponse = {
      status: 200,
      payload: {message: 'successful view the followers'},
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse,
      });
    });

    return store.dispatch(followers()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should not view the followers', () => {
    const expectedResponse = {
      status: 400,
      error: 'error',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedResponse,
      });
    });

    return store.dispatch(followers()).then(() => {
      expect(store.getActions().length).toBe(2);
    });
  });


  it('should view reading stats', () => {
    const expectedResponse = {
      status: 200,
      payload: {message: 'successful view reading stats'},
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse,
      });
    });

    return store.dispatch(readingStats()).then(() => {
      expect(store.getActions().length).toBe(1);
    });
  });

  it('should not view reading stats', () => {
    const expectedResponse = {
      status: 400,
      error: 'error',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: expectedResponse,
      });
    });

    return store.dispatch(readingStats()).then(() => {
    });
  });
});
