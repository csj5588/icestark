import {
  SAVE_CREATE_PRODUCT,
  SAVE_CREATE_PRODUCT_PARAMS,
  INIT_CREATE_PRODUCT_PARAMS,
  SAVE_DOMAIL,
} from './type';
import { DETAIL } from '../constants/modalTypes';

const defualtCreateParams = {
  app_name: '',
  website: '',
  launch_date: '',
  app_key: '',
  contact_person: '',
  desc: '',
  icon: '',
};

const initialState = {
  createPro: {
    show: false,
    type: DETAIL,
    title: '',
  },
  createProParams: {
    ...defualtCreateParams,
  },
  domain: {},
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
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
          ...defualtCreateParams,
        }
      })
      case SAVE_DOMAIL:
        return Object.assign({}, state, {
          domain: action.payload
        })
    default:
      return state;
  }
}
