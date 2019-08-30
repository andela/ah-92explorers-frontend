import { combineReducers } from 'redux';
import articles from './articles';
import signup from './signup';
import { social } from './social.reducer';
import home from './home';
import login from './login';

export default combineReducers({
  articles, signup, home, login, social,
});
