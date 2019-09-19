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
import follow from './follow';
import viewUser from './viewUser';
import likes from './likes';
import notifications from './notifications';
import boookMarking from './bookmarkArticle';
import reportingArticle from './reportArticle';

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
  follow,
  viewUser,
  likes,
  notifications,
  boookMarking,
  reportingArticle,
});
