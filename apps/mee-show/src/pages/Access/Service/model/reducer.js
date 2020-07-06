import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_ENVLIST,
  SAVE_CREATE_ENV,
  SAVE_CREATE_ENV_PARAMS,
  INIT_CREATE_ENV_PARAMS,
} from './type';
import { DETAIL } from '../constants/modalTypes';

const defualtCreateParams = {
  key_uris: '',
  contact_person: '',
  usages: [],
  domain_ids: [],
  desc: '',
};

const initialState = {
  create: {
    show: false,
    type: DETAIL,
    title: '',
  },
  table: {
    data: [],
    config: {},
    total: 0,
  },
  createParams: {
    ...defualtCreateParams,
  },
  createEnv: {
    show: false,
    type: DETAIL,
    title: '',
  },
  createEnvParams: {
    checkList: [],
  },
  searchParams: {
    key: '',
    page: 1,
    count: 10,
  },
  envList: []
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
    case SAVE_CREATE_ENV:
      return Object.assign({}, state, {
        createEnv: {
          ...state.createEnv,
          ...action.payload,
        },
      });
    case SAVE_CREATE_ENV_PARAMS:
      return Object.assign({}, state, {
        createEnvParams: {
          ...action.payload,
        },
      });
    case INIT_CREATE_ENV_PARAMS:
      return Object.assign({}, state, {
        createEnvParams: {
          checkList: [],
        },
      });
    case SAVE_ENVLIST:
      return Object.assign({}, state, {
        envList: [...action.payload],
      });
    default:
      return state;
  }
}
