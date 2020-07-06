/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux'
import { LOCATION_CHANGE } from 'react-router-redux'

import product from '@/pages/Product/model/reducer';
import productDetail from '@/pages/ProductDetail/model/reducer';
import service from '@/pages/Access/Service/model/reducer';
import overView from '@/pages/OverView/model/reducer';
import dispatcher from '@/pages/Access/Dispatcher/model/reducer';
import dispatcherDetail from '@/pages/Access/DispatcherDetail/model/reducer';
import longLink from '@/pages/Access/LongLink/model/reducer';
import buried from '@/pages/Access/Buried/model/reducer';
import busiDomain from '@/pages/ProductDetail/coms/Domain/model/reducer';
import busiVersion from '@/pages/ProductDetail/coms/Version/model/reducer';
import busiEnv from '@/pages/ProductDetail/coms/Env/model/reducer';
import stark from './action-stark';
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
    product,
    productDetail,
    service,
    overView,
    dispatcher,
    dispatcherDetail,
    longLink,
    buried,
    busiDomain,
    busiVersion,
    busiEnv,
    stark,
    route: routeReducer,
    ...injectedReducers,
  })
}
