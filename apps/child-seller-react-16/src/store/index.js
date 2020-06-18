import configureStore, { history } from './configureStore'
import createReducer from './reducers'

const store = configureStore(createReducer())

export default store

// Make reducers hot reloadable, see http://mxs.is/googmo
/* istanbul ignore next */
if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(createReducer(store.injectedReducers));
  });
}
