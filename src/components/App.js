import React from 'react';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import store from '../redux/store';
import Routes from './Routes';
import setAuthorizationToken from '../utils/setAuthToken';
import { setCurrentUser } from '../redux/actions/actionCreators/login';

if (localStorage.getItem('jwtToken')) {
  setAuthorizationToken(localStorage.getItem('jwtToken'));
  store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem('jwtToken'))));
}

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
