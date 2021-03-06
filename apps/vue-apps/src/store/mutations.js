/**
 * 类似事件
 * 每个 mutation 都有一个字符串事件类型 (type) 和 一个 回调函数 (handler), state是第一个参数
 * 要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法
 *
 * @example
 * export default {
 *   [types.APP_CLICK] (state, payload) {
 *     state.appAdded.push(payload)
 *   }
 * }
 */
import { store as stark } from '@ice/stark-data';
import * as mutationTypes from './mutation-types'

export default {
  /**
   * 套题信息
  */
  [mutationTypes.SET_QUESTION_GROUP_INFO] (state, payload) {
    state.questionGroupInfo = payload
  },
  // 通过监听外部的stark变化来更改Vue应用的stark
  syncStarkDown(state, payload) {
    state.stark = payload
  },
  // Vue应用提交更改stark的数据
  syncStarkUp(state, muster) {
    const { starkAction, payload } = muster;
    stark.set('dispatch', { starkAction, payload });
  },
  setInfo(state, payload) {
    state.info = payload
  }
}