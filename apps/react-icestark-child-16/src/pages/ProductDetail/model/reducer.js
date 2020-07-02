import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_INFO,
  SAVE_CREATE_TAB,
  SAVE_CREATE_PRODUCT,
  SAVE_CREATE_PRODUCT_PARAMS,
  INIT_CREATE_PRODUCT_PARAMS,
  SAVE_TAB_LIST,
  SAVE_ACCESS_LIST,
  SAVE_DOMAIL,
} from './type';
import { DETAIL } from '../constants/modalTypes';
const defualtCreateParams = {
  department: '',
  content: '',
};

const defualtCreateProParams = {
  app_name: '',
  website: '',
  launch_date: '',
  app_key: '',
  contact_person: '',
  desc: '',
  icon: '',
};

const initialState = {
  create: {
    show: false,
    type: DETAIL,
    title: '',
  },
  createPro: {
    show: false,
    type: DETAIL,
    title: '',
  },
  createProParams: {
    ...defualtCreateProParams,
  },
  createTab: {
    show: false,
    type: DETAIL,
    title: '',
  },
  infoData: {
    info: {},
    app_status: [],
  },
  tabList: [],
  table: {
    data: [],
    total: 0,
  },
  createParams: {
    ...defualtCreateParams,
  },
  searchParams: {
    app_key: '',
    tab_key: '',
    page: 1,
    limit: 10
  },
  accessList: [],
  domain: {},
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SAVE_ACCESS_LIST:
      return Object.assign({}, state, {
        accessList: action.payload,
      })
    case SAVE_CREATE:
      return Object.assign({}, state, {
        create: {
          ...state.create,
          ...action.payload,
        }
      })
    case SAVE_CREATE_TAB:
      return Object.assign({}, state, {
        createTab: {
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
    case SAVE_INFO:
      return Object.assign({}, state, {
        infoData: {
          ...action.payload,
        }
      })
    case SAVE_CREATE_PRODUCT:
      return Object.assign({}, state, {
        createPro: {
          ...state.createPro,
          ...action.payload,
        }
      })
    case SAVE_CREATE_PRODUCT_PARAMS:
      return Object.assign({}, state, {
        createProParams: {
          ...state.createProParams,
          ...action.payload,
        }
      })
    case INIT_CREATE_PRODUCT_PARAMS:
      return Object.assign({}, state, {
        createProParams: {
          ...defualtCreateProParams,
        }
      })
    case SAVE_TAB_LIST:
      return Object.assign({}, state, {
        tabList: [...action.payload]
      })
    case SAVE_DOMAIL:
      return Object.assign({}, state, {
        domain: action.payload
      })
    default:
      return state;
  }
}
