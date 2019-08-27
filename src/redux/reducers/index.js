import { combineReducers } from 'redux';
import articles from './articles';
import signup from './signup';
import { social } from './social.reducer';
import home from './home';
import login from './login';
import profile from './profile';
import alert from './alert';

export default combineReducers({
  articles, home, signup, login, social, profile, alert,
});
