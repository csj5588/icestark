import * as types from './action-types'

const starkState = {
  stark: {},
}

export const syncStark = payload => ({ type: types.STARK_EMIT, payload })

const starkReducer = (state = starkState, action) => {
  const { payload = {} } = action

  switch (action.type) {
    case types.STARK_EMIT:
      return {
        ...state,
        stark: {
          ...state.stark,
          ...payload,
        },
      }
    default:
      return {
        ...state
      }
  }
}

export default starkReducer
