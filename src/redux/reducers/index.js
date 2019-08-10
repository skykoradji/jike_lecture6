import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import filtersReducer from './filtersReducer';

export default combineReducers({
  todosReducer,
  filtersReducer
});
