import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_CONFIG_LIST,
} from './type';
import S from './../apis';

export const saveCreate = payload => ({ type: SAVE_CREATE, payload });
export const saveTable = payload => ({ type: SAVE_TABLE, payload });
export const saveConfigList = payload => ({ type: SAVE_CONFIG_LIST, payload });
export const saveCreateParams = payload => ({ type: SAVE_CREATE_PARAMS, payload });
export const initCreateParams = payload => ({ type: INIT_CREATE_PARAMS, payload });
export const saveSearchParams = payload => ({ type: SAVE_SEARCH_PARAMS, payload });

export const getTableList = (payload = {}) => async (dispatch, getState) => {
  const { busiEnv: state } = getState();
  const params = {
    ...state.searchParams,
    ...payload,
  }
  S.getDataList(params).then(res => {
    const { data = {} } = res;
    const { envs, config = {}, total = 0 } = data
    const { envs: configList = [] } = config
    dispatch(saveTable({
      data: envs || [],
      total: +total || 0,
    }));
    dispatch(saveConfigList(configList));
    // 回存
    dispatch(saveSearchParams(params));
  });
};

// 新增、编辑
export const add = payload => async (dispatch, getState) => {
  S.add(payload).then(() => {
    // 刷新列表
    dispatch(getTableList());
    // 关闭弹窗
    dispatch(saveCreate({ show: false }));
    dispatch(initCreateParams());
  });
};

export const del = payload => async (dispatch, getState) => {
  S.del(payload).then(() => {
    // 刷新列表
    dispatch(getTableList());
  });
};
