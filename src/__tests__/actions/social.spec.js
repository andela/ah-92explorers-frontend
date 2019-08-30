import dotenv from 'dotenv';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getInfo, success, failure } from '../../redux/actions/actionCreators';
import { socialTypes } from '../../redux/actions/actionTypes';

dotenv.config();
const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
let store = mockStore({});

const user = { firstName: 'Eleman', lastName: 'Hillary Barnabas', email: 'elemanhillary@gmail.com' };
describe('action creators', () => {
  it('should return LOGIN_SUCCESS action with user info', () => {
    const url = '?token=afeb658eb6b702e58baf3e1a41f7bb3e5911c1768ac241e83961605c76a4d2fc3bd53669057e5277621928e4b41cf1b72bf8eddf3a70e34babecfcb5e8ce0c2eeb63af45b32779cd176247e285fca02e5c8eb56331df3087091dd9c99fc5bad065dc0412b0827a799751b2e4a955f555abc06724f94b97fb10a7cc013fc81ed270bcb3c9ab3d3f37f279f10e0a94ea304bcbd42855e9244eea7bbdda7ac0acbe4387e1ee346f3e5ea4bc984dbcc409f789ee603a96ffded96b668794969425c24781a85adfe92d30570b2839ddfde0cb94f153a8606fa1d39dfc3f023be86b3975e76a6b6c2183c2013ebe342471b5cc6082c1af9a02baff6817e232f6b02cd819cc9ee0db008c13650e17d87308748ed777bc3743609439d3e797999e507394033b7dc1bb03e6dd520b48e56b3ad17b76c7e5ff1590e35bb0f66f3121de46cee5d2a39526740b002872c8b41fe3b48e272fe35a323ef25a5d7394de05853f453786912d4b1b35e73e5fe540ae9c862aec2a7512cc8a';
    delete window.location;
    window.location = { search: url };
    const expectedActions = [{
      type: socialTypes.LOGIN_SUCCESS,
      user,
    }];
    const searchURL = window.location.search;
    store.dispatch(getInfo(searchURL));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should return LOGIN_FAILURE', () => {
    const url = '?token=bd53669057e5277621928e4b41cf1b72bf8eddf3a70e34babecfcb5e8ce0c2eeb63af45b32779cd176247e285fca02e5c8eb56331df3087091dd9c99fc5bad065dc0412b0827a799751b2e4a955f555abc06724f94b97fb10a7cc013fc81ed270bcb3c9ab3d3f37f279f10e0a94ea304bcbd42855e9244eea7bbdda7ac0acbe4387e1ee346f3e5ea4bc984dbcc409f789ee603a96ffded96b668794969425c24781a85adfe92d30570b2839ddfde0cb94f153a8606fa1d39dfc3f023be86b3975e76a6b6c2183c2013ebe342471b5cc6082c1af9a02baff6817e232f6b02cd819cc9ee0db008c13650e17d87308748ed777bc3743609439d3e797999e507394033b7dc1bb03e6dd520b48e56b3ad17b76c7e5ff1590e35bb0f66f3121de46cee5d2a39526740b002872c8b41fe3b48e272fe35a323ef25a5d7394de05853f453786912d4b1b35e73e5fe540ae9c862aec2a7512cc8a';
    delete window.location;
    window.location = { search: url };
    store = mockStore({});
    const expectedActions = [{
      type: socialTypes.LOGIN_FAILURE,
      error: 'something went wrong',
    }];
    const searchURL = window.location.search;
    store.dispatch(getInfo(searchURL));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should return LOGIN_FAILURE with undefined token', () => {
    const url = '?token=';
    delete window.location;
    window.location = { search: url };
    const expectedActions = [{
      type: socialTypes.LOGIN_FAILURE,
      error: 'something went wrong',
    }];
    store = mockStore({});
    const searchURL = window.location.search;
    store.dispatch(getInfo(searchURL));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('creates LOGIN_SUCCESS action', () => {
    store = mockStore({});
    store.dispatch(success({ firstName: 'Eleman', lastName: 'Hillary Barnabas', email: 'elemanhillary@gmail.com' }));
    expect(store.getActions()).toMatchSnapshot();
  });
  it('creates LOGIN_FAILURE action', () => {
    store = mockStore({});
    store.dispatch(failure('something went wrong'));
    expect(store.getActions()).toMatchSnapshot();
  });
});
