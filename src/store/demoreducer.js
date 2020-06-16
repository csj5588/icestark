/**
 * 全局 reducer
 */
const initialState = {};

const SOME_ACTION = 'SOME_ACTION';

function someReducer (state = initialState, action) {
  switch (action.type) {
    case SOME_ACTION:
      return Object.assign({}, state, {
        someParams: action.payload,
      });
    default:
      return state;
  }
}

export default someReducer;
