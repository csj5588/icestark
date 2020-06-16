import * as types from './action-types'
const dataAuthState = {
  app: '',
  showBugly: false,
}

const dataAuth = (state = dataAuthState, action) => {
  const { payload = {} } = action

  switch (action.type) {
    case types.SET_DATA_AUTH:
      return {
        ...state,
        ...payload
      }
    default:
      return {
        ...state
      }
  }
}

export default dataAuth
