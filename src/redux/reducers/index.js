import { combineReducers } from 'redux';
import signup from './signup';
import home from './home';
import login from './login';

export default combineReducers({
  home, signup, login,
});
