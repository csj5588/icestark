import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
} from './type';
import { DETAIL } from '../constants/modalTypes';

const defualtCreateParams = {
  uid: '',
  date: '',
  form1: '',
  form2: [],
  form3: undefined,
};

const initialState = {
  create: {
    show: false,
    type: DETAIL,
    title: '',
  },
  table: {
    data: [],
    total: 0,
  },
  createParams: {
    ...defualtCreateParams,
  },
  searchParams: {
    uid: '',
    start_date: '',
    end_date: '',
    search1: '',
    search2: [],
    search3: undefined,
    page: 1,
    size: 10
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SAVE_CREATE:
      return Object.assign({}, state, {
        create: {
          ...state.create,
          ...action.payload,
        }
      })
    case SAVE_CREATE_PARAMS:
      return Object.assign({}, state, {
        createParams: {
          ...state.createParams,
          ...action.payload,
        }
      })
    case INIT_CREATE_PARAMS:
      return Object.assign({}, state, {
        createParams: {
          ...defualtCreateParams,
        }
      })
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
    default:
      return state;
  }
}
