import { message } from 'antd';
import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_DOMAIN_LIST,
  SAVE_USAGE,
} from './type';
import _cloneDeep from 'lodash/cloneDeep';
import S from './../apis';

export const saveCreate = (payload) => ({ type: SAVE_CREATE, payload });
export const saveTable = (payload) => ({ type: SAVE_TABLE, payload });
export const saveCreateParams = (payload) => ({
  type: SAVE_CREATE_PARAMS,
  payload,
});
export const initCreateParams = (payload) => ({
  type: INIT_CREATE_PARAMS,
  payload,
});
export const saveSearchParams = (payload) => ({
  type: SAVE_SEARCH_PARAMS,
  payload,
});
export const saveDomainList = (payload) => ({
  type: SAVE_DOMAIN_LIST,
  payload,
});
export const saveUsage = (payload) => ({ type: SAVE_USAGE, payload });


export const getTableList = (payload = {}) => async (dispatch, getState) => {
  const { buried: state } = getState();
  const params = {
    ...state.searchParams,
    ...payload,
  };
  S.getDataList(params).then((res) => {
    const { data = [] } = res;
    const [first, ...otr] = data;
    dispatch(saveSearchParams(params));
    if (!first) {
      dispatch(saveTable({data: []}));
      dispatch(saveUsage({}));
      dispatch(initCreateParams())
      return
    };
    try {
      const { id, buz_config: buzConfig, usage_config: usagConfig } = first;
      const buzConfigObj = JSON.parse(buzConfig);
      const usagConfigObje = JSON.parse(usagConfig);
      const {
        service_config: serviceConfig,
        domain_config: domainConfig,
      } = buzConfigObj;
      dispatch(
        saveTable({
          data: domainConfig || [],
        })
      );
      // 回存
      dispatch(saveUsage(usagConfigObje));
      const createParams = {
        id,
        service_config: serviceConfig,
        domain_config: domainConfig,
      };
      dispatch(saveCreateParams(createParams));
    } catch (error) {
      console.log(error);
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

// 获取domainList
export const getDomainList = (payload) => async (dispatch, getState) => {
  S.getDomainList(payload).then(res => {
    const { data } = res
    const { domains = [] } = data || {}
    dispatch(saveDomainList(domains))
  });
};
