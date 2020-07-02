import {
  SAVE_CREATE,
  SAVE_CREATE_PARAMS,
  INIT_CREATE_PARAMS,
  SAVE_TABLE,
  SAVE_SEARCH_PARAMS,
  SAVE_INFO,
  SAVE_CREATE_TAB,
  SAVE_CREATE_PRODUCT,
  SAVE_CREATE_PRODUCT_PARAMS,
  INIT_CREATE_PRODUCT_PARAMS,
  SAVE_TAB_LIST,
  SAVE_ACCESS_LIST,
  SAVE_DOMAIL,
} from './type';
import S from './../apis';

export const saveCreate = (payload) => ({ type: SAVE_CREATE, payload });
export const saveAccessList = (payload) => ({
  type: SAVE_ACCESS_LIST,
  payload,
});
export const saveTabList = (payload) => ({ type: SAVE_TAB_LIST, payload });
export const saveCreateTab = (payload) => ({ type: SAVE_CREATE_TAB, payload });
export const saveTable = (payload) => ({ type: SAVE_TABLE, payload });
export const saveInfo = (payload) => ({ type: SAVE_INFO, payload });
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
export const saveCreatePro = (payload) => ({
  type: SAVE_CREATE_PRODUCT,
  payload,
});
export const saveCreateProParams = (payload) => ({
  type: SAVE_CREATE_PRODUCT_PARAMS,
  payload,
});
export const initCreateProParams = (payload) => ({
  type: INIT_CREATE_PRODUCT_PARAMS,
  payload,
});
export const saveDomain = payload => ({ type: SAVE_DOMAIL, payload });

// 获取产品详情信息
export const getAppDetail = (payload = {}) => async (dispatch, getState) => {
  S.getAppDetail(payload).then((res) => {
    const { data = {} } = res;
    const { info, app_status: appStatus } = data;
    dispatch(
      saveInfo({
        info: info || {},
        app_status: appStatus || [],
      })
    );
    dispatch(getAccessList(payload));
    // 回存
  });
};

// 所有可接入项状态查询接口
export const getAccessList = (payload = {}) => async (dispatch, getState) => {
  S.getAccessList(payload).then((res) => {
    const { data } = res;
    dispatch(saveAccessList(data || []));
    // 回存
  });
};

// 获取日志
export const getTableList = (payload = {}) => async (dispatch, getState) => {
  console.log(payload);
  const { productDetail: state } = getState();
  const params = {
    ...state.searchParams,
    ...payload,
  };
  S.getDataList(params).then((res) => {
    const { data = {} } = res;
    const {
      tabs = [],
      selected_tab: { tab_key: tabKey, log = [], total },
    } = data;
    dispatch(
      saveTable({
        data: log || [],
        total: +total || 0,
      })
    );
    dispatch(
      saveTable({
        data: log || [],
        total: +total || 0,
      })
    );
    // 回存
    dispatch(saveTabList(tabs));
    params.tab_key = tabKey;
    dispatch(saveSearchParams(params));
    dispatch(saveCreateTab({ show: true, title: '日志展示' }));
  });
};

// 编辑产品
export const uplate = (payload) => async (dispatch, getState) => {
  const { app_key: appKey } = payload;
  S.uplate(payload).then(() => {
    // 关闭弹窗
    dispatch(saveCreatePro({ show: false }));
    dispatch(initCreateProParams());
    dispatch(getAppDetail({ app_key: appKey }));
  });
};

// 申请新增
export const add = (payload) => async (dispatch, getState) => {
  S.add(payload).then(() => {
    console.log(payload);
    // 关闭弹窗
    dispatch(saveCreate({ show: false }));
    dispatch(initCreateParams());
  });
};

// 下线／归档
export const del = (payload) => async (dispatch, getState) => {
  const { app_key: appKey } = payload;
  S.del(payload).then(() => {
    // 刷新列表
    dispatch(getAppDetail({ app_key: appKey }));
  });
};

export const getDomailList = payload => async (dispatch, getState) => {
  console.log('detail')
  await S.getDomailList(payload).then((res) => {
    const { data } = res
    const { domains = [] } = data || {}
    const [ first = {}, ...other ] = domains || []
    dispatch(saveDomain(first));
  });
};
