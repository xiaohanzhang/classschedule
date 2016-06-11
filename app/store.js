import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers';
import initialState from './initialState';

export default function configureStore() {
  const store = createStore(
    rootReducers,
    initialState,
    compose(
      applyMiddleware(
        thunk
      ),
      window.devToolsExtension ?  window.devToolsExtension() : e => e
    )
  );

  return store;
};


