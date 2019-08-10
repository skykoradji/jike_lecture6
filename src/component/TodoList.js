import React from 'react';
import connectRedux from '../redux/connect';

const getVisibleTodos = ({ todos, filters }) => {
  switch (filters.filter) {
    case 'ALL':
      return todos;
    case 'COMPLETED':
      return todos.filter(t => t.completed);
    case 'ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filters.filter);
  }
}

const TodoList = (props) => (
  <ul>
    { getVisibleTodos(props).map(todo => {
        return (
          <li
            key={todo.id}
            onClick={(e) => props.toogleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}
          >
            {todo.text}
          </li>
        );
      }
    )}
  </ul>
);

export default connectRedux(TodoList);
