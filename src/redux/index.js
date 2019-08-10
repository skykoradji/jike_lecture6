import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

const persistConfig = {
  key: 'redux',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (initialState = {}) => {

  // const store = createStore(rootReducer, applyMiddleware(thunk));
  // return { store };
  const store = createStore(persistedReducer, initialState, applyMiddleware(thunk));

  // Internally React Redux works by calling store.subscribe() when the component mounts. 
  // Every time the Redux store changes, the subscription callback fires.
  // Inside it, React Redux calls React setState() by taking Redux store state and passing it through mapStateToProps()
  //store.subscribe(() => console.log(store.getState()));
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;