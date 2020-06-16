/**
 * 用户信息
 */
import * as types from './action-types'

const defaultUserInfo = {
  uid: '',
  username: '',
  phone: ''
}

const initialState = {
  info: { ...defaultUserInfo },
  isLogin: false
};

const SOME_ACTION = 'SOME_ACTION';

function user (state = initialState, action) {
  switch (action.type) {
    case types.USER_LOGIN:
      return Object.assign({}, state, {
        info: action.payload,
        isLogin: true
      });
    case types.USER_LOGOUT:
      return Object.assign({}, state, {
        info: { ...defaultUserInfo },
        isLogin: true
      })
    default:
      return state;
  }
}

export default user;
