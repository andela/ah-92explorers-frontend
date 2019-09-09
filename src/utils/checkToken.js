/* istanbul ignore file */
import jwtDecode from 'jwt-decode';
import store from '../redux/store';
import setAuthToken from './setAuthToken';
import { setCurrentUser } from '../redux/actions/actionCreators/login';

export const checkToken = () => {
  if (localStorage.getItem('jwtToken')) {
    setAuthToken(localStorage.getItem('jwtToken'));
    store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem('jwtToken'))));
  }
};
