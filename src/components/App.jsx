/* istanbul ignore file */
import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Routes from './Routes';
import { checkToken } from '../utils/checkToken';

checkToken();

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
