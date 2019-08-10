import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Filter from './component/Filter';
import AddTodo from './component/AddTodo';
import VisibleTodoList from './component/TodoList';
import Test from './component/Test';
import configureStore from './redux';
const { store, persistor } = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AddTodo />
      <VisibleTodoList />
      <Filter />
      <Test />
    </PersistGate>
  </Provider>
);

ReactDom.render(<App />, document.getElementById('root'));
