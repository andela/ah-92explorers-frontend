import { combineReducers } from 'redux';
import signup from './signup';
import { social } from './social.reducer';
import home from './home';
import login from './login';

export default combineReducers({
  home, signup, login, social,
});
import articles from './articles';

export default combineReducers({ articles });
