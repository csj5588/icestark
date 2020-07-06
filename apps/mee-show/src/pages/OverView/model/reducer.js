import {
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_ALL_TABLE,
  SAVE_ALL_SEARCH_PARAMS
} from './type';

const initialState = {
  table: {
    data: [],
    total: 0,
  },
  allTable: {
    data: [],
    total: 0,
  },
  searchAllParams: {
    page_token: 1,
    count: 50
  },
  searchParams: {
    page_token: 1,
    count: 50
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SAVE_SEARCH_PARAMS:
      return Object.assign({}, state, {
        searchParams: {
          ...state.searchParams,
          ...action.payload,
        }
      })
    case SAVE_TABLE:
      return Object.assign({}, state, {
        table: {
          ...state.table,
          ...action.payload,
        }
      })
    case SAVE_ALL_TABLE:
      return Object.assign({}, state, {
        allTable: {
          ...state.table,
          ...action.payload,
        }
      })
    case SAVE_ALL_SEARCH_PARAMS:
      return Object.assign({}, state, {
        searchAllParams: {
          ...state.searchAllParams,
          ...action.payload,
        }
      })
    default:
      return state;
  }
}
