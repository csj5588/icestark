import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_CONFIG_LIST,
} from './type';
import { DETAIL } from '../constants/modalTypes';

const defualtCreateParams = {
  app_key: '',
  domain: '',
  proto: undefined,
  env: undefined,
  usage: undefined,
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
    total: 0,
  },
  createParams: {
    ...defualtCreateParams,
  },
  searchParams: {
    app_key: '',
    domain: '',
    page: 1,
    size: 10,
  },
  configList: {
    protos: [], // 协议
    envs: [], // 环境
    usages: [], // 用途
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
    case SAVE_CONFIG_LIST:
      return Object.assign({}, state, {
        configList: {
          ...state.table,
          ...action.payload,
        }
      })
    default:
      return state;
  }
}
