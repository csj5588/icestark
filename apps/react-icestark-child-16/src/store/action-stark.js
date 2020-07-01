import { store as stark } from '@ice/stark-data';
import * as types from './action-types'

const starkState = {
  authApp: {
    curApp: '', // haokan
    curAppItem: {}, // 当前app
    appList: [], // [{ appid: 'haokan', name: '好看' }]
    authList: [], 
  },
  auth: {
    pageButtonTreeRight: []
  }
}

export const syncStarkDown = payload => ({ type: types.STARK_EMIT_DOWN, payload })

export const syncStarkUp = (starkAction, payload) => {
  stark.set('dispatch', { starkAction, payload });
  return ({ type: types.STARK_EMIT_UP });
}

const starkReducer = (state = starkState, action) => {
  const { payload = {} } = action

  switch (action.type) {
    case types.STARK_EMIT_DOWN:
      return {
        ...state,
        ...payload,
      }
    default:
      return {
        ...state
      }
  }
}

export default starkReducer
