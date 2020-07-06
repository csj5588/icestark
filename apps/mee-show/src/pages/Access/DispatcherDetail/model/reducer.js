import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_ENVLIST,
  SAVE_CONFIG,
  SAVE_CREATE_ENV,
  SAVE_CREATE_ENV_PARAMS,
  INIT_CREATE_ENV_PARAMS,
  SAVE_ALL_ENVLIST,
} from './type';
import { DETAIL } from '../constants/modalTypes';

const defualtCreateParams = {
  ev_type: '',
  ev_name: '',
  ev_desc: '',
  env: [],
  before_verify: [],
  before_custom_verify: [],
  now: [],
  after_fe: []
};

const initialState = {
  create: {
    show: false,
    type: DETAIL,
    title: '',
  },
  data: {
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
    ev_name: '',
    page: 1,
    count: 10,
  },
  envList: [],
  config: [],
  allEnvList: [],
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
    case SAVE_SEARCH_PARAMS:
      return Object.assign({}, state, {
        searchParams: {
          ...state.searchParams,
          ...action.payload,
        },
      });
    case SAVE_TABLE:
      return Object.assign({}, state, {
        data: {
          ...state.data,
          ...action.payload,
        },
      });
    case SAVE_ENVLIST:
      return Object.assign({}, state, {
        envList: [...action.payload],
      });
    case SAVE_CONFIG:
      return Object.assign({}, state, {
        config: [...action.payload],
      });
    case SAVE_ALL_ENVLIST:
      return Object.assign({}, state, {
        allEnvList: [...action.payload],
      });
    default:
      return state;
  }
}
