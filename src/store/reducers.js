/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux'
import { LOCATION_CHANGE } from 'react-router-redux'

import someReducer from './demoreducer';
import breadcrumb from './breadcrumbReducer'
import auth from './auth'
import user from './userReducer'
import authApp from './authAppReducer'

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = {
  location: null,
}

/**
 * Merge route into the global application state
 */
function routeReducer (state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      window.scrollTo(0, 0)
      return Object.assign({}, state, { location: action.payload })
    default:
      return state
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer (injectedReducers) {
  return combineReducers({
    auth,
    breadcrumb,
    user,
    authApp,
    route: routeReducer,
    ...injectedReducers,
  })
}
