import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_CONFIG_LIST,
} from './type';
import _isEmpty from 'lodash/isEmpty'
import S from './../apis';

export const saveCreate = payload => ({ type: SAVE_CREATE, payload });
export const saveTable = payload => ({ type: SAVE_TABLE, payload });
export const saveConfigList = payload => ({ type: SAVE_CONFIG_LIST, payload });
export const saveCreateParams = payload => ({ type: SAVE_CREATE_PARAMS, payload });
export const initCreateParams = payload => ({ type: INIT_CREATE_PARAMS, payload });
export const saveSearchParams = payload => ({ type: SAVE_SEARCH_PARAMS, payload });

export const getTableList = (payload = {}) => async (dispatch, getState) => {
  const { longLink: state } = getState();
  const params = {
    ...state.searchParams,
    ...payload,
  }
  S.getDataList(params).then(res => {
    const { data = [] } = res;
    // 回存
    dispatch(saveSearchParams(params));
    if (_isEmpty(data)) {
      dispatch(saveTable({ data: data || [] }))
      return
    }
    try {
      data.forEach(item => {
        item.buzConfig = item.buz_config ? JSON.parse(item.buz_config) : []
        item.usageConfig = item.usage_config ? JSON.parse(item.usage_config) : {}
      });
      dispatch(saveTable({ data: data || [] })
      );
    } catch (error) {
      console.log(error)
    }
  });
};

// 新增
export const add = (payload) => async (dispatch, getState) => {
  S.add(payload).then(() => {
    // 关闭弹窗
    dispatch(saveCreate({ show: false }));
    dispatch(initCreateParams());
    // 刷新列表
    dispatch(getTableList());
  });
};

// 编辑
export const update = (id, payload) => async (dispatch, getState) => {
  S.update(id, payload).then(() => {
    // 关闭弹窗
    dispatch(saveCreate({ show: false }));
    dispatch(initCreateParams());
    // 刷新列表
    dispatch(getTableList());
  });
};

// 获取集群列表
export const getClusters = (payload) => async (dispatch, getState) => {
  S.getClusters(payload).then(res => {
    const { data } = res
    dispatch(saveConfigList(data || []));
  });
};
