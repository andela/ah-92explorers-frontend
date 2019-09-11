import { combineReducers } from 'redux';
import articles from './articles';
import signup from './signup';
import { social } from './social.reducer';
import login from './login';
import profile from './profile';
import alert from './alert';
import resetPassword from './resetPassword';
import resettingPassword from './resettingPassword';
import comments from './comments';
import bookmarks from './bookmarkArticle';

export default combineReducers({
  articles,
  signup,
  login,
  social,
  profile,
  alert,
  resetPassword,
  resettingPassword,
  comments,
  bookmarks,
});
