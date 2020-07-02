import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_DOMAIN_LIST,
  SAVE_USAGE,
} from './type';
import { DETAIL } from '../constants/modalTypes';

const defualtCreateParams = {
  service_config: {},
  domain_config: [],
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
    page: 1,
    limit: 999,
  },
  domainList: [],
  usage: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_CREATE:
      return Object.assign({}, state, {
        create: {
          ...state.create,
          ...action.payload,
        },
      });
    case SAVE_CREATE_PARAMS:
      return Object.assign({}, state, {
        createParams: {
          ...state.createParams,
          ...action.payload,
        },
      });
    case INIT_CREATE_PARAMS:
      return Object.assign({}, state, {
        createParams: {
          ...defualtCreateParams,
        },
      });
    case SAVE_SEARCH_PARAMS:
      return Object.assign({}, state, {
        searchParams: {
          ...state.searchParams,
          ...action.payload,
        },
      });
    case SAVE_TABLE:
      return Object.assign({}, state, {
        table: {
          ...state.table,
          ...action.payload,
        },
      });
    case SAVE_DOMAIN_LIST:
      return Object.assign({}, state, {
        domainList: [...action.payload],
      });
    case SAVE_USAGE:
      return Object.assign({}, state, {
        usage: {
          ...action.payload,
        },
      });
    default:
      return state;
  }
}
