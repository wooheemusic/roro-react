import { combineReducers } from 'redux';
import auth from './auth'
import lang from './lang'

export default combineReducers({
  auth,
  lang
});