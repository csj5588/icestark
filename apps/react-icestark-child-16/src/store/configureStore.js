/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { createHashHistory, createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

// Create hashHistory or browserHistory
export const history = createHashHistory(); // hash
// export const history = createBrowserHistory(); // history

export default function configureStore (initialState = {}) {
  // Create the store with  middlewares
  // routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [thunk, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
      : compose;
  /* eslint-enable */

  const store = createStore(
    initialState,
    composeEnhancers(...enhancers)
  );

  // Extensions
  store.injectedReducers = {}; // Reducer registry

  return store;
}
