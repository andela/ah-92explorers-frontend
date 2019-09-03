import { combineReducers } from 'redux';
import articles from './articles';
import signup from './signup';
import { social } from './social.reducer';
import login from './login';
import profile from './profile';
import alert from './alert';
import resetPassword from './resetPassword';
import resettingPassword from './resettingPassword';

export default combineReducers({
  articles,
  signup,
  login,
  social,
  profile,
  alert,
  resetPassword,
  resettingPassword,
});
