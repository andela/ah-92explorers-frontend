import { combineReducers } from 'redux';
import signup from './signup';
import { social } from './social.reducer';

export default combineReducers({
  signup,
  social,
});
