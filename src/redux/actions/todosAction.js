import { ADD_TODO, TOGGLE_TODO } from '../types';

/**
Actions looks like this -> 
1. plain object
2. has a type
3. whatever else you want
 */

// add todo and update state;
const addTodo = text => {
  return function(dispatch) {
    dispatch({
      type: ADD_TODO,
      id: Math.random(),
      text
    });
  };
};

const toogleTodo = id => {
  return dispatch => {
    dispatch({
      type: TOGGLE_TODO,
      id
    });
  };
};

export default {
  addTodo,
  toogleTodo
};
